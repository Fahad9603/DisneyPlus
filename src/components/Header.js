import { Outlet } from 'react-router-dom'

import MainNavigation from '../navigation/MainNavigation'
//import Footer from '@components/layout/footer/Footer'

const Header = () => {
	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		
		</>
	)
}

export default Header 