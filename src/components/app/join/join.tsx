import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface JoinProps {
  setConnectSocket: (username: string) => void
  onSuccess: () => void
}

interface FormValues {
  username: string
}

const Join: FC<JoinProps> = ({ setConnectSocket, onSuccess }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>()
  const username = watch('username', '')

  const handleJoin: SubmitHandler<FormValues> = (data) => {
    if (data.username.trim()) {
      setConnectSocket(data.username)
      reset()
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleJoin)} className="flex flex-col gap-y-3">
      <label className="flex flex-col gap-y-1">
        <span className="text-sm">Username:</span>
        <input
          className="h-9 px-4 border rounded-sm text-sm"
          type="text"
          placeholder="Enter your username"
          {...register('username', { required: true })}
        />
      </label>

      <button
        type="submit"
        className="text-sm p-2 rounded bg-zinc-950 text-white disabled:bg-muted disabled:text-muted-foreground"
        disabled={!username.trim()} 
      >
        Access
      </button>
    </form>
  )
}

export default Join
