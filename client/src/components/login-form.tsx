"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { signInService } from "@/lib/services/authService"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await signInService({ email, password });

    if(response.status === 200){
      const { message, token } = response.data as { message: string, token: string };
      toast.success(message, {
        position: "bottom-right"
      });
      localStorage.setItem("token", token);
      router.push("/dashboard")
    } else if(response.status === 403){
      const { message } = response.data as { message: string  };
      toast.error(message, {
        position: "bottom-right"
      })
      return
    } else if(response.status === 409){
      const { message } = response.data as { message: string };
      toast.error(message, {
        position: "bottom-right"
      })
      return
    } else {
      const { message } = response.data as { message: string };
      toast.error(message, {
        position: "bottom-right"
      })
      return
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={ email }
                  onChange={ (e) => { setEmail(e.target.value )} }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={ password }
                  onChange={ (e) => { setPassword(e.target.value) } }
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                onClick={ async (e) => await handleSubmit(e) }
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={'/signup'} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
