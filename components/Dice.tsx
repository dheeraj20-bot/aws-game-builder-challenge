import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react'

interface DiceProps {
  onRoll: (value: number) => void
}

export function Dice({ onRoll }: DiceProps) {
  const [value, setValue] = useState(1)
  const [rolling, setRolling] = useState(false)

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  const DiceIcon = diceIcons[value - 1]

  const rollDice = () => {
    if (rolling) return

    setRolling(true)
    const rollDuration = 1000
    const intervalDuration = 50
    const totalSteps = rollDuration / intervalDuration

    let step = 0
    const intervalId = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1)
      step++

      if (step >= totalSteps) {
        clearInterval(intervalId)
        setRolling(false)
        const finalValue = Math.floor(Math.random() * 6) + 1
        setValue(finalValue)
        onRoll(finalValue)
      }
    }, intervalDuration)
  }

  return (
    <motion.div
      className="w-24 h-24 bg-red-500 rounded-2xl shadow-lg flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={rollDice}
      animate={rolling ? { rotateX: 360, rotateY: 360 } : {}}
      transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
    >
      <DiceIcon size={60} className="text-white w-24 h-24" />
    </motion.div>
  )
}

