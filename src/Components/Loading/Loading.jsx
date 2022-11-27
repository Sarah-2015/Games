import React from 'react'
import styles from './Loading.module.css'

export default function Loading() {
  return (
    <div  className=' vh-100 d-flex justify-content-center align-items-center'>
        <div className={styles.ldsspinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
