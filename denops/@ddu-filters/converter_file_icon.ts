import {
	BaseFilter,
	DduItem,
	SourceOptions,
	ItemHighlight,
} from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v2.0.0/deps.ts";
import {
  basename,
  extname,
  relative,
} from "https://deno.land/std@0.183.0/path/mod.ts";

type Params = Record<never, never>;

type IconData = {
	icon: string;
	hl_group: string;
	color: string;
};

export class Filter extends BaseFilter<Params> {
	override async filter(args: {
		denops: Denops;
		sourceOptions: SourceOptions;
		input: string;
		items: DduItem[];
	}): Promise<DduItem[]> {
		for (const item of args.items) {
			const fileName = basename(item.word);
			const iconData: IconData = this.getIcon(fileName);
			// set icon
			item.display = `${iconData.icon} ${item.word}`;
			// 受け取ったitemのハイライトを上書きする
			const highlights: ItemHighlight[] = item.highlights ?? [];
			// filterParamsのpromptの文字列の長さを取得
			const width = await fn.strwidth(args.denops, iconData.icon) as number;
			const hl_group = `ddu_file_icon_${iconData.hl_group}`;
			highlights.push({
				name: "ddu_file_icon",
				hl_group: hl_group,
				// itemのprefixが勝手にとられてるくさくて、その対処にcolを3(マジックナンバー)にしている
				col: 3,
				width: width,
			});
			item.highlights = highlights;
			const color = iconData.color.startsWith("!") ? iconData.color.slice(1) : iconData.color;
			await args.denops.cmd(`hi default link ${hl_group} ${color}`);
		}
		return Promise.resolve(args.items);
	}

	override params(): Params {
		return {};
	}

	private getIcon(fileName: string): IconData {
		const extention = extname(fileName).slice(1);
		const iconData = fileIcons.get(extention);
		if (iconData) {
			return iconData;
		} else {
			return {
				icon: "",
				hl_group: "file_unknown",
				color: palette.default,
			};
		}
	}

}

// for preventing typo
const palette = {
  default: "!default",
  aqua: "!aqua",
  beige: "!beige",
  blue: "!blue",
  brown: "!brown",
  darkBlue: "!darkBlue",
  darkOrange: "!darkOrange",
  green: "!green",
  lightGreen: "!lightGreen",
  lightPurple: "!lightPurple",
  orange: "!orange",
  pink: "!pink",
  purple: "!purple",
  red: "!red",
  salmon: "!salmon",
  yellow: "!yellow",
};

// deno-fmt-ignore-start
const fileIcons = new Map<string, IconData>([                                    // nerd font class name
  ["ai",     { icon: "", hl_group: "file_ai",     color: palette.darkOrange  }], // nf-dev-illustrator
  ["awk",    { icon: "", hl_group: "file_awk",    color: palette.default     }], // nf-dev-terminal
  ["bash",   { icon: "", hl_group: "file_bash",   color: palette.default     }], // nf-dev-terminal
  ["bat",    { icon: "", hl_group: "file_bat",    color: palette.default     }], // nf-dev-aptana
  ["blend",  { icon: "", hl_group: "file_blend",  color: palette.darkOrange  }], // nf-mdi-blender
  ["bmp",    { icon: "", hl_group: "file_bmp",    color: palette.aqua        }], // nf-fa-file_image_o
  ["c",      { icon: "", hl_group: "file_c",      color: palette.blue        }], // nf-custom-c
  ["clj",    { icon: "", hl_group: "file_clj",    color: palette.green       }], // nf-dev-clojure
  ["cljc",   { icon: "", hl_group: "file_cljc",   color: palette.green       }], // nf-dev-clojure
  ["cljs",   { icon: "", hl_group: "file_cljs",   color: palette.green       }], // nf-dev-clojure_alt
  ["coffee", { icon: "", hl_group: "file_coffee", color: palette.brown       }], // nf-dev-coffeescript
  ["conf",   { icon: "", hl_group: "file_conf",   color: palette.default     }], // nf-dev-aptana
  ["cpp",    { icon: "", hl_group: "file_cpp",    color: palette.blue        }], // nf-custom-cpp
  ["cs",     { icon: "", hl_group: "file_cs",     color: palette.blue        }], // nf-mdi-language_csharp
  ["csh",    { icon: "", hl_group: "file_csh",    color: palette.default     }], // nf-dev-terminal
  ["css",    { icon: "", hl_group: "file_css",    color: palette.blue        }], // nf-dev-css3
  ["d",      { icon: "", hl_group: "file_d",      color: palette.red         }], // nf-dev-dlangd
  ["db",     { icon: "", hl_group: "file_db",     color: palette.blue        }], // nf-fa-database
  ["dart",   { icon: "", hl_group: "file_dart",   color: palette.blue        }], // nf-dev-dart
  ["doc",    { icon: "", hl_group: "file_doc",    color: palette.darkBlue    }], // nf-fa-file_word_o
  ["docx",   { icon: "", hl_group: "file_docx",   color: palette.darkBlue    }], // nf-fa-file_word_o
  ["elm",    { icon: "", hl_group: "file_elm",    color: palette.default     }], // nf-dev-dart
  ["ex",     { icon: "", hl_group: "file_ex",     color: palette.lightPurple }], // nf-custom-elixir
  ["exs",    { icon: "", hl_group: "file_exs",    color: palette.lightPurple }], // nf-custom-elixir
  ["fish",   { icon: "", hl_group: "file_fish",   color: palette.green       }], // nf-dev-terminal
  ["fs",     { icon: "", hl_group: "file_fs",     color: palette.blue        }], // nf-dev-fsharp
  ["fsx",    { icon: "", hl_group: "file_fsx",    color: palette.blue        }], // nf-dev-fsharp
  ["gif",    { icon: "", hl_group: "file_gif",    color: palette.aqua        }], // nf-fa-file_image_o
  ["go",     { icon: "", hl_group: "file_go",     color: palette.beige       }], // nf-dev-go
  ["gz",     { icon: "", hl_group: "file_gz",     color: palette.default     }], // nf-oct-file_zip
  ["h",      { icon: "", hl_group: "file_h",      color: palette.default     }], // nf-fa-h_square
  ["hpp",    { icon: "", hl_group: "file_hpp",    color: palette.default     }], // nf-fa-h_square
  ["hs",     { icon: "", hl_group: "file_hs",     color: palette.beige       }], // nf-dev-haskell
  ["html",   { icon: "", hl_group: "file_html",   color: palette.darkOrange  }], // nf-dev-html5
  ["ico",    { icon: "", hl_group: "file_ico",    color: palette.aqua        }], // nf-fa-file_image_o
  ["java",   { icon: "", hl_group: "file_java",   color: palette.purple      }], // nf-dev-java
  ["jl",     { icon: "", hl_group: "file_jl",     color: palette.purple      }], // nf-seti-julia
  ["jpeg",   { icon: "", hl_group: "file_jpeg",   color: palette.aqua        }], // nf-fa-file_image_o
  ["jpg",    { icon: "", hl_group: "file_jpg",    color: palette.aqua        }], // nf-fa-file_image_o
  ["js",     { icon: "", hl_group: "file_js",     color: palette.beige       }], // nf-dev-javascript
  ["jsx",    { icon: "", hl_group: "file_jsx",    color: palette.blue        }], // nf-dev-react
  ["json",   { icon: "", hl_group: "file_json",   color: palette.beige       }], // nf-seti-json
  ["lock",   { icon: "", hl_group: "file_lock",   color: palette.beige       }], // nf-fa-lock
  ["log",    { icon: "", hl_group: "file_log",    color: palette.yellow      }], // nf-oct-file
  ["lua",    { icon: "", hl_group: "file_lua",    color: palette.purple      }], // nf-seti-lua
  ["md",     { icon: "", hl_group: "file_md",     color: palette.blue        }], // nf-dev-markdown
  ["mdx",    { icon: "", hl_group: "file_mdx",    color: palette.blue        }], // nf-dev-markdown
  ["mov",    { icon: "", hl_group: "file_mov",    color: palette.orange      }], // nf-fa-file_movie_o
  ["mp3",    { icon: "", hl_group: "file_mp3",    color: palette.salmon      }], // nf-fa-file_audio_o
  ["mp4",    { icon: "", hl_group: "file_mp4",    color: palette.orange      }], // nf-fa-file_movie_o
  ["otf",    { icon: "", hl_group: "file_otf",    color: palette.red         }], // nf-fa-font
  ["pdf",    { icon: "", hl_group: "file_pdf",    color: palette.darkOrange  }], // nf-oct-file_pdf
  ["php",    { icon: "", hl_group: "file_php",    color: palette.purple      }], // nf-dev-php
  ["pl",     { icon: "", hl_group: "file_pl",     color: palette.blue        }], // nf-dev-perl
  ["pm",     { icon: "", hl_group: "file_pm",     color: palette.blue        }], // nf-dev-perl
  ["png",    { icon: "", hl_group: "file_png",    color: palette.aqua        }], // nf-fa-file_image_o
  ["pp",     { icon: "", hl_group: "file_pp",     color: palette.default     }], // nf-oct-beaker
  ["ppm",    { icon: "", hl_group: "file_ppm",    color: palette.aqua        }], // nf-fa-file_image_o
  ["ppt",    { icon: "", hl_group: "file_ppt",    color: palette.orange      }], // nf-fa-file_powerpoint_o
  ["pptx",   { icon: "", hl_group: "file_pptx",   color: palette.orange      }], // nf-fa-file_powerpoint_o
  ["psd",    { icon: "", hl_group: "file_psd",    color: palette.darkBlue    }], // nf-dev-photoshop
  ["py",     { icon: "", hl_group: "file_py",     color: palette.yellow      }], // nf-dev-python
  ["rake",   { icon: "", hl_group: "file_rake",   color: palette.red         }], // nf-dev-ruby
  ["rb",     { icon: "", hl_group: "file_rb",     color: palette.red         }], // nf-dev-ruby
  ["rmd",    { icon: "", hl_group: "file_rmd",    color: palette.blue        }], // nf-dev-markdown
  ["rs",     { icon: "", hl_group: "file_rs",     color: palette.red         }], // nf-dev-rust
  ["rss",    { icon: "", hl_group: "file_rss",    color: palette.darkOrange  }], // nf-fa-rss
  ["sass",   { icon: "", hl_group: "file_sass",   color: palette.default     }], // nf-dev-sass
  ["scala",  { icon: "", hl_group: "file_scala",  color: palette.red         }], // nf-dev-scala
  ["scss",   { icon: "", hl_group: "file_scss",   color: palette.pink        }], // nf-dev-sass
  ["sh",     { icon: "", hl_group: "file_sh",     color: palette.lightPurple }], // nf-dev-terminal
  ["slim",   { icon: "", hl_group: "file_slim",   color: palette.orange      }], // nf-seti-html
  ["sln",    { icon: "", hl_group: "file_sln",    color: palette.purple      }], // nf-dev-visualstudio
  ["styl",   { icon: "", hl_group: "file_styl",   color: palette.green       }], // nf-dev-stylus
  ["swift",  { icon: "", hl_group: "file_swift",  color: palette.orange      }], // nf-dev-swift
  ["tex",    { icon: "", hl_group: "file_tex",    color: palette.default     }], // nf-mdi-text_shadow
  ["toml",   { icon: "", hl_group: "file_toml",   color: palette.default     }], // nf-dev-aptana
  ["ts",     { icon: "", hl_group: "file_ts",     color: palette.blue        }], // nf-seti-typescript
  ["tsx",    { icon: "", hl_group: "file_tsx",    color: palette.blue        }], // nf-dev-react
  ["ttf",    { icon: "", hl_group: "file_ttf",    color: palette.red         }], // nf-fa-font
  ["txt",    { icon: "", hl_group: "file_txt",    color: palette.default     }], // nf-seti-text
  ["vim",    { icon: "", hl_group: "file_vim",    color: palette.green       }], // nf-dev-vim
  ["vue",    { icon: "﵂", hl_group: "file_vue",    color: palette.green       }], // nf-mdi-vuejs
  ["webp",   { icon: "", hl_group: "file_webp",   color: palette.aqua        }], // nf-fa-file_image_o
  ["xls",    { icon: "", hl_group: "file_xls",    color: palette.lightGreen  }], // nf-fa-file_excel_o
  ["xlsx",   { icon: "", hl_group: "file_xlsx",   color: palette.lightGreen  }], // nf-fa-file_excel_o
  ["yaml",   { icon: "", hl_group: "file_yaml",   color: palette.default     }], // nf-dev-aptana
  ["yml",    { icon: "", hl_group: "file_yml",    color: palette.default     }], // nf-dev-aptana
  ["zip",    { icon: "", hl_group: "file_zip",    color: palette.default     }], // nf-oct-file_zip
  ["zsh",    { icon: "", hl_group: "file_zsh",    color: palette.default     }], // nf-dev-terminal
]);
// deno-fmt-ignore-end
