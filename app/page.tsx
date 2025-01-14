"use client";

import { useState, useEffect } from "react";
import { GameBoard } from "../components/GameBoard";
import { Dice } from "../components/Dice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trophy, LocateIcon } from "lucide-react";
const board = [
  { id: 1, service: "IAM", type: "normal", icon: "cloud" },
  { id: 2, service: "EC2", type: "normal", icon: "server" },
  { id: 3, service: "S3", type: "normal", icon: "database" },
  { id: 4, service: "VPC", type: "normal", icon: "cloud" },
  { id: 5, service: "RDS", type: "ladder", icon: "database", destination: 15 },
  { id: 6, service: "Route 53", type: "normal", icon: "cloud" },
  { id: 7, service: "CloudFront", type: "normal", icon: "cloud" },
  {
    id: 8,
    service: "CloudWatch",
    type: "snake",
    icon: "cloud",
    destination: 4,
  },
  { id: 9, service: "CloudFormation", type: "normal", icon: "cloud" },
  {
    id: 10,
    service: "Cloud Practitioner",
    type: "certification",
    icon: "award",
  },
  { id: 11, service: "ELB", type: "normal", icon: "cloud" },
  { id: 12, service: "Auto Scaling", type: "normal", icon: "server" },
  {
    id: 13,
    service: "Lambda",
    type: "ladder",
    icon: "server",
    destination: 23,
  },
  { id: 14, service: "API Gateway", type: "normal", icon: "cloud" },
  { id: 15, service: "DynamoDB", type: "normal", icon: "database" },
  { id: 16, service: "SNS", type: "normal", icon: "cloud" },
  { id: 17, service: "SQS", type: "snake", icon: "cloud", destination: 7 },
  { id: 18, service: "Elastic Beanstalk", type: "normal", icon: "cloud" },
  { id: 19, service: "ECS", type: "normal", icon: "server" },
  {
    id: 20,
    service: "Developer Associate",
    type: "certification",
    icon: "award",
  },
  { id: 21, service: "CodeCommit", type: "normal", icon: "cloud" },
  { id: 22, service: "CodeBuild", type: "normal", icon: "cloud" },
  { id: 23, service: "CodeDeploy", type: "normal", icon: "cloud" },
  {
    id: 24,
    service: "CodePipeline",
    type: "ladder",
    icon: "cloud",
    destination: 29,
  },
  { id: 25, service: "CloudTrail", type: "normal", icon: "cloud" },
  {
    id: 26,
    service: "Systems Manager",
    type: "snake",
    icon: "server",
    destination: 12,
  },
  { id: 27, service: "Secrets Manager", type: "normal", icon: "database" },
  { id: 28, service: "Config", type: "normal", icon: "cloud" },
  { id: 29, service: "GuardDuty", type: "normal", icon: "cloud" },
  { id: 30, service: "DevOps Engineer", type: "certification", icon: "award" },
];

export default function AWSSnakeAndLadders() {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const handleDiceRoll = (value: number) => {
    if (gameOver) return;

    let newPosition = playerPosition + value;
    if (newPosition > 30) newPosition = 30;

    const space = board.find((s) => s.id === newPosition);
    if (space) {
      if (space.type === "ladder") {
        toast({
          title: "Fast-track!",
          description: `You've mastered ${space.service}! Advance to ${
            board.find((s) => s.id === space.destination)?.service
          }.`,
        });
        newPosition = space.destination!;
      } else if (space.type === "snake") {
        toast({
          title: "Setback!",
          description: `Oops! You need to review ${space.service}. Go back to ${
            board.find((s) => s.id === space.destination)?.service
          }.`,
        });
        newPosition = space.destination!;
      } else if (space.type === "certification") {
        toast({
          title: "Certification Milestone!",
          description: `Congratulations! You've reached the ${space.service} certification!`,
        });
      } else {
        toast({
          title: `AWS Service: ${space.service}`,
          description: `You've learned about ${space.service}. Keep climbing!`,
        });
      }
      setPlayerPosition(newPosition);
    }

    if (newPosition === 30) {
      setGameOver(true);
      toast({
        title: "Congratulations!",
        description: "You've become an AWS DevOps Engineer!",
      });
    }
  };

  const resetGame = () => {
    setPlayerPosition(1);
    setGameOver(false);
  };

  return (
    <section>
      <div className="min-h-screen bg-gray-900 flex flex-col gap-10 md:flex-row items-center ">
        <div className="mb-8 w-full max-w-4xl">
          <GameBoard playerPosition={playerPosition} />
        </div>
           
       
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-2">
            <span className="text-lg font-medium text-white">
              {playerPosition}/30{" "}
              
            </span>
           
          </div>
          {!gameOver ? (
            <div className="flex flex-col items-center">
              <Dice onRoll={handleDiceRoll} />
              <p className="text-sm text-gray-400 mt-2">Roll to learn more!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Trophy className="text-yellow-500 mb-2" size={48} />
              <p className="text-white text-center mb-2">
                You've mastered AWS!
              </p>
              <Button size="sm" onClick={resetGame}>
                Play Again
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
        {board.find((s) => s.id === playerPosition)?.service}
        </div>
      </div>
    </section>
  );
}
