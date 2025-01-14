import { motion } from 'framer-motion'
import { Cloud, Database, Server, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface BoardSpace {
  id: number
  service: string
  type: 'normal' | 'certification' | 'ladder' | 'snake'
  icon: 'cloud' | 'database' | 'server' | 'award'
  href?: string
  destination?: number
}

const board: BoardSpace[] = [
  { id: 1, service: "IAM", type: "normal", icon: "cloud" },
  { id: 2, service: "EC2", type: "normal", icon: "server" },
  { id: 3, service: "S3", type: "normal", icon: "database" },
  { id: 4, service: "VPC", type: "normal", icon: "cloud" },
  { id: 5, service: "RDS", type: "ladder", icon: "database", destination: 15 },
  { id: 6, service: "Route 53", type: "normal", icon: "cloud" },
  { id: 7, service: "CloudFront", type: "normal", icon: "cloud" },
  { id: 8, service: "CloudWatch", type: "snake", icon: "cloud", destination: 4 },
  { id: 9, service: "CloudFormation", type: "normal", icon: "cloud" },
  { id: 10, service: "Cloud Practitioner", type: "certification", icon: "award",href:"/aws-cloudp.png" },
  { id: 11, service: "ELB", type: "normal", icon: "cloud" },
  { id: 12, service: "Auto Scaling", type: "normal", icon: "server" },
  { id: 13, service: "Lambda", type: "ladder", icon: "server", destination: 23 },
  { id: 14, service: "API Gateway", type: "normal", icon: "cloud" },
  { id: 15, service: "DynamoDB", type: "normal", icon: "database" },
  { id: 16, service: "SNS", type: "normal", icon: "cloud" },
  { id: 17, service: "SQS", type: "snake", icon: "cloud", destination: 7 },
  { id: 18, service: "Elastic Beanstalk", type: "normal", icon: "cloud" },
  { id: 19, service: "ECS", type: "normal", icon: "server" },
  { id: 20, service: "Developer Associate", type: "certification", icon: "award",href:"/aws-cloudD.png" },
  { id: 21, service: "CodeCommit", type: "normal", icon: "cloud" },
  { id: 22, service: "CodeBuild", type: "normal", icon: "cloud" },
  { id: 23, service: "CodeDeploy", type: "normal", icon: "cloud" },
  { id: 24, service: "CodePipeline", type: "ladder", icon: "cloud", destination: 29 },
  { id: 25, service: "CloudTrail", type: "normal", icon: "cloud" },
  { id: 26, service: "Systems Manager", type: "snake", icon: "server", destination: 12 },
  { id: 27, service: "Secrets Manager", type: "normal", icon: "database" },
  { id: 28, service: "Config", type: "normal", icon: "cloud" },
  { id: 29, service: "GuardDuty", type: "normal", icon: "cloud" },
  { id: 30, service: "DevOps Engineer", type: "certification", icon: "award",href:"/aws-devops.png" },
]

interface GameBoardProps {
  playerPosition: number
}

export function GameBoard({ playerPosition }: GameBoardProps) {
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'certification': return 'bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-90'
      case 'ladder': return 'bg-green-500 bg-opacity-70'
      case 'snake': return 'bg-red-500 bg-opacity-70'
      default: return 'bg-gray-700 bg-opacity-50'
    }
  }

  return (
    <div className="relative w-full max-w-4xl">
      <div className="absolute inset-0 bg-space-background bg-cover bg-center rounded-lg opacity-50"></div>
      <div className="relative grid grid-cols-6 gap-2 p-4 rounded-lg">
        {[...Array(5)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {[...Array(6)].map((_, colIndex) => {
              const index = rowIndex % 2 === 0 ? rowIndex * 6 + colIndex : rowIndex * 6 + (5 - colIndex)
              const space = board[index]
              return (
                <motion.div
                  key={space.id}
                  className={`w-full h-24 rounded-lg  flex flex-col items-center justify-center p-2 ${getBackgroundColor(space.type)} ${playerPosition === space.id ? 'border-4 border-red-500' : ''}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-1">
                    {space.icon === 'cloud' && <Cloud className="text-blue-300" size={20} />}
                    {space.icon === 'database' && <Database className="text-green-300" size={20} />}
                    {space.icon === 'server' && <Server className="text-purple-300" size={20} />}
                  </div>
                  <span className="text-white font-bold text-sm text-center">{space.href?(<Image alt='aws certification' src={space.href} className=' w-20 h-20' width={1000} height={1000} />):(<>{space.id}. {space.service}</>)}</span>
                  {space.type === 'ladder' && <ArrowUpRight className="text-green-300 mt-1" size={16} />}
                  {space.type === 'snake' && <ArrowDownRight className="text-red-300 mt-1" size={16} />}
                  
                </motion.div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

