import React from 'react'
import { Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-body">
                <div className="right-panel">
                    ©<script>document.write(new Date().getFullYear())</script>  2025 Dinas Pemuda, Olahraga dan Pariwisata Kota Balikpapan
                </div>
            </div>
        </footer>
    )
}

export default Footer
