import {Button, Separator} from "@radix-ui/themes"

export const Navbar = () => {
    return <div className="flex flex-col">
        <div className="flex h-14 items-center justify-between p-4">
            <p>Call me Yadolf Yitler, bitches still wanna fuck</p>
            <Button>
                Login
            </Button>
        </div>
        <Separator size="4"/>
    </div>
}