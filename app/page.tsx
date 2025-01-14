"use client";

import { useState, useEffect } from "react";
import { GameBoard } from "../components/GameBoard";
import { Dice } from "../components/Dice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trophy, LocateIcon } from "lucide-react";

const board = [
  { id: 1, service: "IAM", type: "normal", icon: "cloud", description: "Identity and Access Management (IAM) enables you to manage access to AWS services and resources securely. You can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources." },
  { id: 2, service: "EC2", type: "normal", icon: "server", description: "Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS Cloud. It allows you to launch virtual servers, configure security and networking, and manage storage, reducing the need to invest in hardware upfront." },
  { id: 3, service: "S3", type: "normal", icon: "database", description: "Amazon Simple Storage Service (S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. It can be used for a range of scenarios including websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics." },
  { id: 4, service: "VPC", type: "normal", icon: "cloud", description: "Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways." },
  { id: 5, service: "RDS", type: "ladder", icon: "database", destination: 15, description: "Amazon Relational Database Service (RDS) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching and backups." },
  { id: 6, service: "Route 53", type: "normal", icon: "cloud", description: "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost-effective way to route end users to Internet applications by translating names like www.example.com into the numeric IP addresses." },
  { id: 7, service: "CloudFront", type: "normal", icon: "cloud", description: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment." },
  { id: 8, service: "CloudWatch", type: "snake", icon: "cloud", destination: 4, description: "Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers. CloudWatch provides data and actionable insights to monitor your applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health." },
  { id: 9, service: "CloudFormation", type: "normal", icon: "cloud", description: "AWS CloudFormation provides a common language for you to describe and provision all the infrastructure resources in your cloud environment. CloudFormation allows you to use programming languages or a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts." },
  { id: 10, service: "Cloud Practitioner", type: "certification", icon: "award", description: "AWS Certified Cloud Practitioner is an entry-level certification that demonstrates an overall understanding of the AWS Cloud. It's designed to validate your ability to define what the AWS Cloud is and its basic global infrastructure, describe basic AWS Cloud architectural principles, and explain the AWS Cloud value proposition." },
  { id: 11, service: "ELB", type: "normal", icon: "cloud", description: "Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions. It can handle the varying load of your application traffic in a single Availability Zone or across multiple Availability Zones." },
  { id: 12, service: "Auto Scaling", type: "normal", icon: "server", description: "AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it's easy to setup application scaling for multiple resources across multiple services in minutes." },
  { id: 13, service: "Lambda", type: "ladder", icon: "server", destination: 23, description: "AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running. With Lambda, you can run code for virtually any type of application or backend service - all with zero administration." },
  { id: 14, service: "API Gateway", type: "normal", icon: "cloud", description: "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the 'front door' for applications to access data, business logic, or functionality from your backend services." },
  { id: 15, service: "DynamoDB", type: "normal", icon: "database", description: "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications." },
  { id: 16, service: "SNS", type: "normal", icon: "cloud", description: "Amazon Simple Notification Service (SNS) is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications. It provides topics for high-throughput, push-based, many-to-many messaging." },
  { id: 17, service: "SQS", type: "snake", icon: "cloud", destination: 7, description: "Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS eliminates the complexity and overhead associated with managing and operating message-oriented middleware." },
  { id: 18, service: "Elastic Beanstalk", type: "normal", icon: "cloud", description: "AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS." },
  { id: 19, service: "ECS", type: "normal", icon: "server", description: "Amazon Elastic Container Service (ECS) is a fully managed container orchestration service. ECS lets you easily run, stop, and manage Docker containers on a cluster. You can host your cluster on a serverless infrastructure that's managed by Amazon ECS by launching your services or tasks using the Fargate launch type." },
  { id: 20, service: "Developer Associate", type: "certification", icon: "award", description: "AWS Certified Developer - Associate demonstrates your technical expertise in developing and maintaining applications on the AWS platform. It validates your ability to write and deploy cloud-based applications, and your understanding of core AWS services, uses, and basic AWS architecture best practices." },
  { id: 21, service: "CodeCommit", type: "normal", icon: "cloud", description: "AWS CodeCommit is a fully-managed source control service that hosts secure Git-based repositories. It makes it easy for teams to collaborate on code in a secure and highly scalable ecosystem. CodeCommit eliminates the need to operate your own source control system or worry about scaling its infrastructure." },
  { id: 22, service: "CodeBuild", type: "normal", icon: "cloud", description: "AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy. With CodeBuild, you don't need to provision, manage, and scale your own build servers." },
  { id: 23, service: "CodeDeploy", type: "normal", icon: "cloud", description: "AWS CodeDeploy is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers. CodeDeploy makes it easier for you to rapidly release new features, helps you avoid downtime during application deployment, and handles the complexity of updating your applications." },
  { id: 24, service: "CodePipeline", type: "ladder", icon: "cloud", destination: 29, description: "AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates. CodePipeline automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define." },
  { id: 25, service: "CloudTrail", type: "normal", icon: "cloud", description: "AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure." },
  { id: 26, service: "Systems Manager", type: "snake", icon: "server", destination: 12, description: "AWS Systems Manager gives you visibility and control of your infrastructure on AWS. Systems Manager provides a unified user interface so you can view operational data from multiple AWS services and allows you to automate operational tasks across your AWS resources." },
  { id: 27, service: "Secrets Manager", type: "normal", icon: "database", description: "AWS Secrets Manager helps you protect secrets needed to access your applications, services, and IT resources. The service enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle." },
  { id: 28, service: "Config", type: "normal", icon: "cloud", description: "AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time." },
  { id: 29, service: "GuardDuty", type: "normal", icon: "cloud", description: "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts, workloads, and data stored in Amazon S3. GuardDuty uses machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats." },
  { id: 30, service: "DevOps Engineer", type: "certification", icon: "award", description: "AWS Certified DevOps Engineer - Professional demonstrates your technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform. It validates your ability to implement and manage continuous delivery systems and methodologies on AWS, as well as implement security controls and governance processes." },
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

        <div className="bg-white flex flex-col max-w-md mr-2 gap-5 text-center p-4 rounded-lg shadow-md">
          <span>
          {board.find((s) => s.id === playerPosition)?.service}
          </span>
         <span>
         {board.find((s) => s.id === playerPosition)?.description}
         </span>
        </div>
      </div>
    </section>
  );
}
