# ddu-filter-converter_file_icon
add icon for file.

Inspired by [ddu-column-icon_filename](https://github.com/ryota2357/ddu-column-icon_filename)

## Required

denops.vim

https://github.com/vim-denops/denops.vim

ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration
```vim
call ddu#custom#patch_global(#{
    \   filterParams: #{
    \     converter_file_icon: # {
    \       prompt: '> ',
    \     },
    \   },
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_substring'],
    \       converters: ['converter_file_icon'],
    \     },
    \   }
    \ })
 ```
