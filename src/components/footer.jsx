function Footer () {
    return <footer className="page-footer pink darken-3">
        <div className="container">
            <div className="row">
                <div className="col l6 s12">
                    <h5 className="white-text">The best Shop page</h5>
                    <p className="grey-text text-lighten-4">The best basket! </p>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Reserved.
                <a className="grey-text text-lighten-4 right" href="#!">Maden by Chirmi</a>
            </div>
        </div>
    </footer>
}
export { Footer};