import TeslaLogo from '/assets/tesla.svg'

const Header = () => {
  return (
    <div className="header">
    <div className="topLine"><img className="logo" src={TeslaLogo} alt="Tesla Logo" /></div>
    <div className="title">
        <h1>Select Battery Configuration</h1>
    </div>
    </div>
  );
}

export default Header;