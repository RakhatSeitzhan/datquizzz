import { useState } from "react"

function Login({ handleJoin }){
    const [val, setVal] = useState('')
    const handlePress = () => {
        handleJoin(val)
    }
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto 2rem',
        width: '70%',
        // alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    }}>
        <input style={{
            fontSize: '1.5rem'
        }} value={val} placeholder='Enter your name... (wrong answers only)' onChange={e => setVal(e.target.value)}/>
        <button style={{width: 'fit-content', fontSize: '1.5rem'}} onClick={handlePress}>Join</button>
    </div>)
}
export default Login