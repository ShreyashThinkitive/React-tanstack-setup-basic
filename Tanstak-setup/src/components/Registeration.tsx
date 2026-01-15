import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export function Registeration() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        console.log("user data:", data);

    }


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card variant="outlined" sx={{ width: 400 }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >
                            <TextField label="Name" variant="standard"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.name.message}</p>}
                            <TextField label="Email" variant="standard"
                                {...register("email", { required: "Name is required" })}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                            <TextField label="Password" type="password" variant="standard"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (

                                <p style={{ color: "red" }}>{errors.password.message}</p>)}

                            <Button variant="outlined" type="submit">
                                Submit
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </Box>

        </>
    )
}