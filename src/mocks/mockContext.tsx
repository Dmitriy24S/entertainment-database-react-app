import { ContextProvider } from '../context/ContextProvider'

export const MockAppContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ContextProvider>{children}</ContextProvider>
)
