local M = {}

--- Get the icon and highlight for a given filename
-- @param filename string
-- @return string
function M.get_icon(filename)
	local icon, _ = require("nvim-web-devicons").get_icon(filename)
	return icon
end

--- Get the icon highlight
-- @param filename string
-- @return string
function M.get_icon_highlight(filename)
	local _, highlight = require("nvim-web-devicons").get_icon(filename)
	return highlight
end

--- Get the icon and color for a given filename
-- @param filename string
-- @return string
function M.get_icon_color(filename)
	local _, color = require("nvim-web-devicons").get_icon_color(filename)
	return color
end

return M
