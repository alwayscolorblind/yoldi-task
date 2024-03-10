'use server'

import { requests } from '@/api/server'
import { cookies } from 'next/headers'
import { permanentRedirect, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ProfileDto } from '@/api/swagger'
import { ServerActionState } from '@/types'

export async function handleLogin(_: any, formData: FormData): Promise<ServerActionState> {
  let redirectPath = ''
  let state = { isError: false }

  try {
    const loginDto = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const res = await requests.login(loginDto)

    cookies().set('token', res.value)
    cookies().set('authenticated', 'true', { httpOnly: true })
    redirectPath = '/'
  } catch (e) {
    state.isError = true
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }

  return state
}

export async function handleRegister(_: any, formData: FormData): Promise<ServerActionState> {
  let redirectPath = ''
  let state = { isError: false }

  try {
    const registerDto = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const res = await requests.signUp(registerDto)

    cookies().set('token', res.value)
    cookies().set('authenticated', 'true', { httpOnly: true })
    redirectPath = '/'
  } catch (e) {
    state.isError = true
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }

  return state
}

export async function getMyProfile() {
  try {
    return await requests.myProfile()
  } catch (e) {
    return null
  }
}

export async function logout() {
  cookies().delete('token')
  cookies().delete('authenticated')
  revalidatePath('/')
  permanentRedirect('/')
}

export async function getUsers() {
  try {
    return await requests.users()
  } catch (e) {
    return null
  }
}

export async function getUser(slug: string): Promise<{ user: ProfileDto, isOwner: boolean } | null> {
  try {
    const userData = await requests.user(slug)

    const ownerData = await getMyProfile()

    return { user: userData, isOwner: ownerData?.slug === slug }
  } catch (e) {
    return null
  }
}

export async function toLogin() {
  redirect('/auth/login')
}

export async function toEdit(slug: string) {
  redirect(`/${slug}/edit`)
}

export async function changeProfile(_: any, formData: FormData): Promise<ServerActionState> {
  let redirectPath = ''
  let state = { isError: false }

  try {
    const changeDto = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
    }

    const res = await requests.updateMyProfile({ ...changeDto, coverId: null, password: null, imageId: null })

    redirectPath = `/${res.slug}`
  } catch (e) {
    state.isError = true
  } finally {
    if (redirectPath) {
      permanentRedirect(redirectPath)
    }
  }

  return state
}
