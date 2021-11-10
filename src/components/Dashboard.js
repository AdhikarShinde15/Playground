import { useState } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [error, seterror] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        seterror('')
        try {
           await logout()
           history.push("/login")
        }catch {
            seterror("Failed to Logout")
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: {currentUser.email}</strong>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3" >Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Logout</Button>
            </div>
        </>
    )
}

export default Dashboard