'use client';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useSignAndExecuteTransactionBlock, useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { DEVNET_NFT_PACKAGE_ID } from '@/constants';
import { useState, useEffect } from 'react';

interface PlayerStatsCardProps {
    avatarId: string;
}

function getRandomName() {
    const firstNames = ['Ethan', 'Isabella', 'Liam', 'Amelia', 'Jackson', 'Sofia', 'Mason', 'Olivia', 'Noah', 'Ava'];
    const lastNames = ['Caldwell', 'Finch', 'Preston', 'Cross', 'Monroe', 'Blake', 'Hart', 'Bennett', 'Winters', 'Reid'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

export function PlayerStatsCard({ avatarId }: PlayerStatsCardProps) {
    const [name, setName] = useState('John Doe');
    const [health, setHealth] = useState(0);
    const [attack, setAttack] = useState(0);

    const level = 1;
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    useEffect(() => {
        setName(getRandomName());
        setHealth(getRandomNumber(500));
        setAttack(getRandomNumber(100));
    }, []);

    function mintNFT() {
        const txb = new TransactionBlock();
        txb.moveCall({
            arguments: [txb.pure(name), txb.pure(avatarId), txb.pure(level), txb.pure(health), txb.pure(attack), txb.pure(0), txb.pure('https://generalist.dev')],
            target: `${DEVNET_NFT_PACKAGE_ID}::devnet_nft::mint_to_sender`,
        });

        signAndExecute(
            {
                transactionBlock: txb,
                options: {
                    // We need the effects to get the objectId of the created counter object
                    showEffects: true,
                },
            },
            {
                onSuccess: (tx) => {
                    suiClient
                        .waitForTransactionBlock({
                            digest: tx.digest,
                        })
                        .then(() => {
                            const objectId = tx.effects?.created?.[0]?.reference?.objectId;
                            if (objectId) {
                                console.log(`NFT minted with objectId: ${objectId}`);
                                window.alert(`NFT minted with objectId: ${objectId}`);
                            }
                        });
                },
            }
        );
    }

    return (
        <div className="w-96 mr-20 relative ">
            <div className="absolute -inset-16 background-animate bg-gradient-to-r to-blue-600 from-pink-600 rounded-lg blur-3xl opacity-75 group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"></div>

            <Card className=" bg-gradient-to-r to-blue-500 from-pink-500  font-oxanium  glass border-0">
                <CardHeader className=" text-white p-6 rounded-t-lg ">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">EasyA</h2>
                            <p className="">Player 17</p>
                        </div>
                        <Avatar className=" text-white bg-black font-bold flex justify-center items-center">P17</Avatar>
                    </div>
                </CardHeader>

                <CardContent className="p-6 flex flex-wrap items-center  gap-3 space-y-4 bg-black">
                    <div className="badge badge-lg">987,654 XP</div>

                    <div className="badge">Sui</div>
                    <div className="badge badge-neutral">Polkadot</div>
                    <div className="badge badge-primary">EasyA</div>
                    <div className="badge badge-secondary">Health {health}/500</div>
                    <div className="badge badge-accent">Attack {attack}/100</div>
                    <div className="badge badge-ghost">Level {level}</div>
                </CardContent>
                <CardFooter className="flex gap-4 bg-black w-full flex-col justify-between p-6 ">
                    <button className="btn btn-primary w-full" onClick={() => mintNFT()}>
                        Mint NFT
                    </button>
                    <button className="btn btn-secondary w-full">Transfer</button>
                </CardFooter>
            </Card>
        </div>
    );
}
