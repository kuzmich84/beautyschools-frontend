import React from 'react'

interface StrapiSuccessProps {
  message: string
}

export default function StrapiSuccess({ message }: StrapiSuccessProps) {
  if (!message) return null
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-green-500 bg-green-50 p-4"
    >
      <strong className="block font-medium text-sm text-green-800">
        {message}
      </strong>
    </div>
  )
}
