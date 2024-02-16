import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutationAuth } from '../hooks/useMutationAuth'
import type { Credential } from '../types'
import ArrowPathIcon from '@heroicons/react/16/solid/ArrowPathIcon'

export const Auth = () => {
  const [form, setForm] = useState<Credential>({ email: '', password: '' })
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const { loginMutation, registerMutation } = useMutationAuth()

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLogin) {
      loginMutation.mutate(form)
    } else {
      registerMutation.mutateAsync(form).then(() => loginMutation.mutate(form))
    }
  }
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          React Todo App
        </h1>
        <h2 className="text-sm text-center text-blue-400">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, email: event.target.value })
              }}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, password: event.target.value })
              }
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button
              disabled={!form.email || !form.password}
              className="btn btn-block"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="flex mt-4 justify-center">
          <ArrowPathIcon
            onClick={() => setIsLogin(!isLogin)}
            className="h-6 w-6 cursor-pointer text-blue-400"
          />
        </div>
      </div>
    </div>
  )
}
