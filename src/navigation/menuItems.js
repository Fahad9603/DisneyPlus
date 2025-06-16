import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined'
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined'

export const menuItems = [
	{ text: 'Home', path: '/home', icon: <HomeOutlinedIcon /> },
	{ text: 'Search', path: '/search', icon: <SearchIcon /> },
	{ text: 'My List', path: '/wishlist', icon: <PlaylistAddIcon /> },
	{ text: 'Movies', path: '/movies', icon: <LocalMoviesOutlinedIcon /> },
	{ text: 'Series', path: '/series', icon: <MovieFilterOutlinedIcon /> },
]