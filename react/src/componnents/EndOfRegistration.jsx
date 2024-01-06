
function EndOfRegistration() {

    return(

     <>
     <form className="endOfRegister">
        <br />
        <input
          className="id inputs"
          type="text"
          placeholder="id"
          required
          value={id}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <br />
        <input
         className="name inputs"
          type="text"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input
         className="email inputs"
          type="text"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input
         className="phone inputs"
          type="number"
          placeholder="phone"
          required
          value={phone}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input className="takanon" type="checkbox" name="scales" required />
        <label className="takanon" htmlFor="scales">
          I agree to accept all site conditions
        </label>
        <input className="btns" type="submit" onClick={signIn} value="Sign in" />
        <br />
      </form>
     </>

    )
}
export default EndOfRegistration;