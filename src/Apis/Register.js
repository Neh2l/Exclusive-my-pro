export default async function CreateNewUser(data) {
    try {
        const req = await fetch('https://backend-gules-six-47.vercel.app/api/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        
        

        if (!req.ok) {
            throw new Error(`Error: ${req.status}`);
        }
        const responseData = await req.json();
        console.log("Response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Request failed:", error.message);
        return null;
    }
}
