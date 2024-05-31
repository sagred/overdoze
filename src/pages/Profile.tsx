import { Suspense, useEffect, useState } from "react";
import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  HandLandmarker,
  HandLandmarkerOptions,
  FilesetResolver,
  PoseLandmarker,
  PoseLandmarkerOptions,
} from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4, Vector3, Box3, Quaternion } from "three";
import { Canvas, useFrame, useGraph } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { Link, useParams } from "react-router-dom";
import bg1Image from "../assets/bg.jpeg";
import bg2Image from "../assets/bg2.jpeg";
import bg3Image from "../assets/bg3.jpeg";
import bg4Image from "../assets/bg4.jpeg";
import Header from "../components/Header";

let video: HTMLVideoElement;
let faceLandmarker: FaceLandmarker;
let handLandmarker: HandLandmarker;
let poseLandmarker: PoseLandmarker;
let lastVideoTime = -1;
let blendshapes: any[] = [];
let rotation: Euler;
let handLandmarks: any[] = [];
let poseLandmarks: any[] = [];
let headMesh: any[] = [];
let handMeshes: any[] = [];

const faceOptions: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: "GPU",
  },
  numFaces: 1,
  runningMode: "VIDEO",
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

const handOptions: HandLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
    delegate: "GPU",
  },
  numHands: 2,
  runningMode: "VIDEO",
};

const poseOptions: PoseLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task`,
    delegate: "GPU",
  },
  runningMode: "VIDEO",
};

function Avatar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  console.log(nodes);

  useEffect(() => {
    if (nodes.Wolf3D_Head) headMesh.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) headMesh.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) headMesh.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) headMesh.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) headMesh.push(nodes.Wolf3D_Head_Custom);

    // Assuming the hand meshes are named correctly in the GLTF model
  }, [nodes, url]);

  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach((element) => {
        headMesh.forEach((mesh) => {
          let index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });

      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(
        rotation.x / 5 + 0.3,
        rotation.y / 5,
        rotation.z / 5
      );
      nodes.Spine2.rotation.set(
        rotation.x / 10,
        rotation.y / 10,
        rotation.z / 10
      );
    }

    // console.log(poseLandmarks);

    // if (handLandmarks.length > 0) {
    //   handLandmarks.forEach((hand, handIndex) => {
    //     hand.forEach((landmark: any, index: any) => {
    //       if (handMeshes[handIndex]) {
    //         // Update the hand mesh position with the detected landmarks
    //         handMeshes[handIndex].position.set(
    //           landmark.x,
    //           landmark.y,
    //           landmark.z
    //         );
    //       }
    //     });
    //   });

    //   const poseMap = {
    //     LeftShoulder: 11,
    //     LeftHand: 15,
    //     LeftHandThumb1: 21,
    //     LeftHandIndex1: 19,
    //     LeftHandPinky1: 17,
    //     RightShoulder: 12,
    //     RightHand: 16,
    //     RightHandThumb1: 22,
    //     RightHandIndex1: 20,
    //     RightHandPinky1: 18,
    //   };
    //   console.log(poseLandmarks[0][11]);
    //   Object.keys(poseMap).forEach((key) => {
    //     const index = poseMap[key];
    //     const landmark = poseLandmarks[0][index];
    //     console.log(index, key, landmark);
    //     if (landmark) {
    //       const node = nodes[key];
    //       if (node) {
    //         node.position.x = landmark.x;
    //         node.position.y = landmark.y;
    //         node.position.z = landmark.z;
    //       }
    //     }
    //   });
    // }

    if (poseLandmarks.length > 0) {
      // const poseMap = {
      //   Hips: 0,
      //   Spine: 1,
      //   Spine1: 2,
      //   Spine2: 3,
      //   Neck: 4,
      //   Head: 5,
      //   LeftShoulder: 11,
      //   LeftArm: 12,
      //   LeftForeArm: 13,
      //   LeftHand: 14,
      //   RightShoulder: 23,
      //   RightArm: 24,
      //   RightForeArm: 25,
      //   RightHand: 26,
      //   LeftUpLeg: 27,
      //   LeftLeg: 28,
      //   LeftFoot: 29,
      //   LeftToeBase: 30,
      //   RightUpLeg: 31,
      //   RightLeg: 32,
      //   RightFoot: 33,
      //   RightToeBase: 34,
      // };
      // Object.keys(poseMap).forEach((key) => {
      //   const index = poseMap[key];
      //   const landmark = poseLandmarks[index];
      //   console.log(key, landmark);
      //   if (landmark) {
      //     const node = nodes[key];
      //     if (node) {
      //       node.position.x = landmark.x;
      //       node.position.y = landmark.y;
      //       node.position.z = landmark.z;
      //     }
      //   }
      // });
      // const mapLandmarkToVector3 = (index: number) => {
      //   if (poseLandmarks[index]) {
      //     const landmark = poseLandmarks[index];
      //     return new Vector3(landmark.x, landmark.y, landmark.z);
      //   } else {
      //     console.error(`Pose landmark at index ${index} is undefined.`);
      //     return new Vector3(); // Return a default vector
      //   }
      // };
      // const leftShoulder = mapLandmarkToVector3(11);
      // const leftElbow = mapLandmarkToVector3(13);
      // const leftWrist = mapLandmarkToVector3(15);
      // const rightShoulder = mapLandmarkToVector3(12);
      // const rightElbow = mapLandmarkToVector3(14);
      // const rightWrist = mapLandmarkToVector3(16);
      // const leftUpperArm = nodes.LeftArm;
      // const leftLowerArm = nodes.LeftForeArm;
      // const leftHand = nodes.LeftHand;
      // const rightUpperArm = nodes.RightArm;
      // const rightLowerArm = nodes.RightForeArm;
      // const rightHand = nodes.RightHand;
      // const applyRotationFromVector = (
      //   bone: any,
      //   start: Vector3,
      //   end: Vector3
      // ) => {
      //   const direction = new Vector3().subVectors(end, start).normalize();
      //   const quaternion = new Quaternion().setFromUnitVectors(
      //     new Vector3(1, 0, 0),
      //     direction
      //   );
      //   bone.setRotationFromQuaternion(quaternion);
      // };
      // // Left arm
      // if (leftUpperArm && leftElbow && leftShoulder) {
      //   applyRotationFromVector(leftUpperArm, leftShoulder, leftElbow);
      // }
      // if (leftLowerArm && leftWrist && leftElbow) {
      //   applyRotationFromVector(leftLowerArm, leftElbow, leftWrist);
      // }
      // if (leftHand) {
      //   leftHand.position.set(leftWrist.x, leftWrist.y, leftWrist.z);
      // }
      // // Right arm
      // if (rightUpperArm && rightElbow && rightShoulder) {
      //   applyRotationFromVector(rightUpperArm, rightShoulder, rightElbow);
      // }
      // if (rightLowerArm && rightWrist && rightElbow) {
      //   applyRotationFromVector(rightLowerArm, rightElbow, rightWrist);
      // }
      // if (rightHand) {
      //   rightHand.position.set(rightWrist.x, rightWrist.y, rightWrist.z);
      // }
    }
  });

  // Centering and scaling the avatar
  const box = new Box3().setFromObject(scene);
  const center = new Vector3();
  box.getCenter(center);
  scene.position.sub(center); // Center the model

  // Adjust the scaling if needed
  const size = new Vector3();
  box.getSize(size);
  const scale = 1.75 / size.y;
  scene.position.y -= 0.55;
  scene.position.z += 4;
  scene.scale.set(scale, scale, scale);

  return <primitive object={scene} />;
}

function Profile() {
  const { avatarId } = useParams<{ avatarId: string }>();
  const [bgCounter, setBgCounter] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [url, setUrl] = useState<string>(
    `https://models.readyplayer.me/${avatarId}.glb?morphTargets=ARKit&textureAtlas=1024`
  );
  const [isLoading, setIsLoading] = useState(false);

  const bgImages = [bg1Image, bg2Image, bg3Image, bg4Image];

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      faceOptions
    );
    handLandmarker = await HandLandmarker.createFromOptions(
      filesetResolver,
      handOptions
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(
      filesetResolver,
      poseOptions
    );

    video = document.getElementById("video") as HTMLVideoElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predict);
      });
  };

  const predict = async () => {
    let nowInMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error("Video dimensions are zero.");
        return;
      }

      const faceLandmarkerResult = faceLandmarker.detectForVideo(
        video,
        nowInMs
      );
      const handLandmarkerResult = handLandmarker.detectForVideo(
        video,
        nowInMs
      );
      const poseLandmarkerResult = poseLandmarker.detectForVideo(
        video,
        nowInMs
      );

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

        const matrix = new Matrix4().fromArray(
          faceLandmarkerResult.facialTransformationMatrixes![0].data
        );
        rotation = new Euler().setFromRotationMatrix(matrix);
      }

      if (
        handLandmarkerResult.landmarks &&
        handLandmarkerResult.landmarks.length > 0
      ) {
        handLandmarks = handLandmarkerResult.landmarks;
      }

      if (
        poseLandmarkerResult.landmarks &&
        poseLandmarkerResult.landmarks.length > 0
      ) {
        poseLandmarks = poseLandmarkerResult.landmarks;
      }
    }

    window.requestAnimationFrame(predict);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      <div className="flex flex-col font-oxanium min-h-screen background-animate bg-gradient-to-b from-black to-pink-950 w-full h-full relative">
        <div className="max-w-7xl mx-auto absolute top-0 z-50 ">
          <div className="bg-black w-screen z-50 px-10 py-2">
            <Header />
          </div>
        </div>

        <div className=" flex backdrop-blur-3xl w-full z-10">
          <button
            className="absolute btn btn-circle mr-10 z-50"
            disabled={bgCounter === 3}
            onClick={() => setBgCounter(bgCounter + 1)}
            style={{ right: "0", top: "40%", transform: "translateY(-50%)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M5.536 21.886a1.004 1.004 0 001.033-.064l13-9a1 1 0 000-1.644l-13-9A1 1 0 005 3v18a1 1 0 00.536.886z" />
            </svg>
          </button>
          <div className="p-4 w-full flex flex-col items-center justify-center">
            <video className="camera-feed hidden" id="video" autoPlay></video>
            {isChecked ? (
              <div className="w-96 rounded-full overflow-hidden mt-20 flex flex-col border-4 bg-gradient-to-b from-pink-950 to-black">
                <Canvas
                  style={{ height: 384 }}
                  camera={{ fov: 35, position: [0, 0, 5] }}
                  className="w-full bg-red"
                  shadows
                >
                  <Suspense
                    fallback={
                      <Html className="loading loading-ring loading-lg"></Html>
                    }
                  >
                    <ambientLight intensity={0.4} />
                    <pointLight
                      position={[10, 10, 10]}
                      color={new Color(1, 1, 1)}
                      intensity={0.5}
                      castShadow
                    />
                    <pointLight
                      position={[-10, 0, 10]}
                      color={new Color(1, 1, 1)}
                      intensity={1.0}
                      castShadow
                    />
                    <pointLight position={[0, 0, 10]} intensity={0.5} />
                    <directionalLight
                      position={[0, 10, 10]}
                      intensity={0.5}
                      castShadow
                      color={new Color(1, 1, 1)}
                    />
                    <OrbitControls />

                    <Avatar url={url} />
                  </Suspense>
                </Canvas>
              </div>
            ) : (
              <img
                className="w-96 h-96 rounded-full mt-20 border-4"
                src="/public/sagred.jpeg"
              />
            )}

            <div className="text-white flex flex-col gap-2 max-w-lg items-center justify-center mt-10">
              <h1 className="font-bold  text-4xl">Sagar Reddy</h1>
              <h2 className="font-medium text-md">@sagred</h2>
              <div className="form-control mt-10 ">
                <label className="cursor-pointer label">
                  <span className="label-text text-white text-lg font-bold">
                    Overdoze
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary ml-4"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mockup-code my-10 max-w-xl mx-auto">
          <pre data-prefix="1">
            <code>{"import { OverdozeNFT } from 'overdoze'"}</code>
          </pre>
          <pre data-prefix="2">
            <code></code>
          </pre>
          <pre data-prefix="3">
            <code>{"const AvatarNFT = () => {"}</code>
          </pre>
          <pre data-prefix="4">
            <code>{"    return ("}</code>
          </pre>
          <pre data-prefix="5">
            <code>{"        <OverdozeNFT"}</code>
          </pre>
          <pre data-prefix="6">
            <code>{"            nftId={6658f24836c854537e2b1ac8}"}</code>
          </pre>
          <pre data-prefix="7">
            <code>{"        />"}</code>
          </pre>
          <pre data-prefix="8">
            <code>{"    )"}</code>
          </pre>
          <pre data-prefix="9">
            <code>{"}"}</code>
          </pre>
          <pre data-prefix="10">
            <code>{""}</code>
          </pre>
          <pre data-prefix="11">
            <code>{"export default AvatarNFT"}</code>
          </pre>
        </div>
      </div>
    </>
  );
}

export default Profile;
