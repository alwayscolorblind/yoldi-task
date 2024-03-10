import { Layout } from '@/app/auth/components/layout'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout footerType="signup">
      {children}
    </Layout>
  )
}
