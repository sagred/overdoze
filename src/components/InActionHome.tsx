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
  const box = new Box3().setFromObject(scene);
  const center = new Vector3();
  box.getCenter(center);
  scene.position.sub(center);
  const size = new Vector3();
  box.getSize(size);
  const scale = 1.75 / size.y;
  scene.position.y -= 0.6;
  scene.position.z += 4.3;
  scene.scale.set(scale, scale, scale);

  return <primitive object={scene} />;
}

function InActionHome() {
  const { avatarId } = useParams<{ avatarId: string }>();

  const [url, setUrl] = useState<string>(
    `https://models.readyplayer.me/${avatarId}.glb?morphTargets=ARKit&textureAtlas=1024`
  );

  const [isLoading, setIsLoading] = useState(false);

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

  const urlList = [
    "https://models.readyplayer.me/665625d709dff701a3921aab.glb?morphTargets=ARKit&textureAtlas=1024",
    "https://models.readyplayer.me/6658ce8cf0bca3c7a3aa4f22.glb?morphTargets=ARKit&textureAtlas=1024",
    "https://models.readyplayer.me/6659eec784e89d3714194aa4.glb?morphTargets=ARKit&textureAtlas=1024",
    "https://models.readyplayer.me/665891a2dd37bca36d90b422.glb?morphTargets=ARKit&textureAtlas=1024",
    "https://models.readyplayer.me/6659ef11dd37bca36d99fc58.glb?morphTargets=ARKit&textureAtlas=1024",
    "https://models.readyplayer.me/6658cee509dff701a3a55dab.glb?morphTargets=ARKit&textureAtlas=1024",
  ];

  const XPPlaceHolder = ["+2976", "+2765", "+2634", "+1987", "+1765", "+1654"];

  return (
    <>
      <div className="flex font-oxanium mt-5 ">
        <div className="flex backdrop-blur-sm  items-center w-full justify-center relative z-10">
          <div className="flex-1 p-4">
            <video className="camera-feed hidden" id="video" autoPlay></video>
            <div>
              <h1 className="text-white  text-2xl my-6">Trending alter-egos</h1>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {urlList.map((currentURL, index) => {
                return (
                  <div className="w-full flex flex-col border-4 bg-gradient-to-b from-pink-950 to-black">
                    <div className="flex items-center w-full justify-between">
                      <span className="indicator-item indicator-top indicator-center badge badge-primary">
                        New
                      </span>
                      <span className="indicator-item indicator-top indicator-center badge badge-secondary">
                        {XPPlaceHolder[index]}
                      </span>
                    </div>
                    <Canvas
                      key={index}
                      style={{ height: 320 }}
                      camera={{ fov: 35, position: [0, 0, 5] }}
                      className="w-full"
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
                        <Avatar url={currentURL} />
                      </Suspense>
                    </Canvas>
                    <h2 className="ext-black bg-white font-medium">
                      EasyA x Consensus Hackathon
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default InActionHome;
