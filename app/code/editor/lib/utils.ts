import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

// className="bg-zinc-900"
const theme = createTheme({
    theme: 'dark',
    settings: {
      background: 'rgb(24 24 27)',
      foreground: '#75baff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBackground: '#fff',
      gutterForeground: '#8a919966',
    },
    styles: [
      { tag: t.comment, color: '#8a919966' },
      { tag: t.variableName, color: 'rgb(20 184 166)' },
      { tag: [t.string, t.special(t.brace)], color: 'rgb(96 165 250)' },
      { tag: t.number, color: 'rgb(192 132 252)' },
      { tag: t.bool, color: 'rgb(192 132 252)' },
      { tag: t.null, color: 'rgb(192 132 252)' },
      { tag: t.keyword, color: 'rgb(59 130 246)' },
      { tag: t.operator, color: 'rgb(192 132 252)' },
      { tag: t.className, color: 'rgb(59 130 246)' },
      { tag: t.definition(t.typeName), color: '#fff' },
      { tag: t.typeName, color: 'rgb(192 132 252)' },
      { tag: t.angleBracket, color: '#8a919966' },
      { tag: t.paren, color: 'rgb(20 184 166)' },
      { tag: t.propertyName, color: 'rgb(59 130 246)'},
      // { tag: t., color: '#8a919966' },
      { tag: t.tagName, color: 'rgb(59 130 246)' },
      { tag: t.attributeName, color: 'rgb(192 132 252)' },
    ],
  });

  // className="bg-blue-400"
  export { theme }