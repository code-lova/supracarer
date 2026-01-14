import Register from '@components/pages/authentication/Register'
import React from 'react'

export const metadata = {
  title: "Sign Up - Supracarer",
  description: "Create your Supracarer account and start your journey with us.",
};

const page = () => {
  return (
    <div>
      <Register />
    </div>
  )
}

export default page
