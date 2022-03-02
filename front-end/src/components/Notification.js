import React from 'react'
const Notification = ({ message,style }) => {
  if(message===''){
    return <></>
  }
  return <div className={style}>{message}</div>
}
export default Notification