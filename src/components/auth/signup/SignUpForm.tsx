import signUpAction from '@/actions/signUpAction'
import { useFormState } from 'react-dom'
import PendingSubmitButton from '../PendingSubmitButton'

export type InputErrorsT = {
  username?: string[]
  email?: string[]
  password?: string[]
}

export type RegisterFormStateT = {
  error: boolean
  InputErrors?: InputErrorsT
  message?: string
}

type SignUpFormInitialStateT = {
  error: false // not boolean
}
type SignUpFormErrorStateT = {
  error: true // not boolean
  message: string // not optional
  inputErrors?: InputErrorsT
}
// discriminated union
export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT
// explicitly set type here
const initialState: SignUpFormInitialStateT = {
  error: false,
}

export default function SignUpForm() {
  const initialState = {
    error: false,
  }
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState
  )
  return (
    <form className="my-8" action={formAction}>
      <div className="mb-3">
        <label htmlFor="username" className="block mb-1">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="border border-gray-300 w-full rounded-sm px-2 py-1"
        />
        {state.error && state?.inputErrors?.username ? (
          <div className="text-red-700" aria-live="polite">
            {state.inputErrors.username[0]}
          </div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="bg-white border border-zinc-300 w-full rounded-sm p-2"
        />
        {state.error && state?.inputErrors?.username ? (
          <div className="text-red-700" aria-live="polite">
            {state.inputErrors.username[0]}
          </div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="bg-white border border-zinc-300 w-full rounded-sm p-2"
        />
      </div>
      <div className="mb-3">
        <PendingSubmitButton />
        {state.error && state.message ? (
          <div className="text-red-700" aria-live="polite">
            {state.message}
          </div>
        ) : null}
      </div>
    </form>
  )
}
