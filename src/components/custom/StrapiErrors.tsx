interface StrapiErrorsProps {
  message: string | null
  name: string
  status: string | null
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null
  let errorMessage
  if (error.message === 'Email or Username are already taken') {
    errorMessage =
      'Пользователь с таким email или именем уже существует. Пожалуйста введите другой.'
  }
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-sm text-red-800">
        {errorMessage}
      </strong>
    </div>
  )
}
