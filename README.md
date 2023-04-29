# ddu-filter-converter_file_icon

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
