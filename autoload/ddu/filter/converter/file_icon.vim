function! ddu#filter#converter#file_icon#get_icon(filename) abort
	if has('nvim') && luaeval('pcall(require, "nvim-web-devicons")')
		return luaeval('require("ddu-filter-converter_file_icon").get_icon(_A[1])', [a:filename])
	endif
endfunction

function! ddu#filter#converter#file_icon#get_icon_highlight(filename) abort
	if has('nvim') && luaeval('pcall(require, "nvim-web-devicons")')
		return luaeval('require("ddu-filter-converter_file_icon").get_icon_highlight(_A[1])', [a:filename])
	endif
endfunction

function! ddu#filter#converter#file_icon#get_icon_color(filename) abort
	if has('nvim') && luaeval('pcall(require, "nvim-web-devicons")')
		return luaeval('require("ddu-filter-converter_file_icon").get_icon_color(_A[1])', [a:filename])
	endif
endfunction
