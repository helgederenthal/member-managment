import { ClickAwayListener, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

type InfoButtonProps = {
  message: NonNullable<React.ReactNode>
  className?: string
}

const InfoButton: React.FC<React.PropsWithChildren<InfoButtonProps>> = ({
  message,
  className = '',
}: InfoButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setShowTooltip((prev) => !prev)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClose = () => {
    setShowTooltip(false)
  }

  const handleClickAway = () => {
    if (!isHovered) {
      handleClose()
    }
  }

  return (
    <Tooltip
      title={
        <ClickAwayListener onClickAway={handleClickAway}>
          <span className="ToolTipMessage">{message}</span>
        </ClickAwayListener>
      }
      open={showTooltip}
    >
      <span
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <InfoOutlinedIcon className={className} />
      </span>
    </Tooltip>
  )
}

export default InfoButton
