'use client'
import { Parser, HtmlRenderer } from 'commonmark'
import './reset.css'

export default function Page() {
  const markdown = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

* Bullet point 1
* Bullet point 2
* Bullet point 3

1. Numbered list item 1
2. Numbered list item 2
3. Numbered list item 3


# Markdown Guide 

## Headings

Use the hash character (#) followed by a space to create a heading. The number of hashes determines the level of the heading.

### Example

## Lists

To create a list, use asterisks (*) or hyphens (-) for unordered lists and numbers (1.) for ordered lists.

### Example


## Code Blocks

To create a code block, use three backticks followed by the programming language and a newline character.

## Other Markdown Features

* [Links](https://www.example.com)
* [Images](https://www.example.com/image.png)
* [Tables](https://www.example.com/table.html)
* [Horizontal Rules](---)
* [Quotes](> Lorem ipsum dolor sit amet, consectetur adipiscing elit.)

**Note:** For more detailed information on Markdown syntax, please refer to the [Markdown Guide](https://www.markdownguide.org/).`

  var reader = new Parser();
  var writer = new HtmlRenderer();
  var parsed = reader.parse(markdown); // parsed is a 'Node' tree
  // transform parsed if you like...
  var result = writer.render(parsed); // result is a String
  console.log(result)
return (
  <div className="Container" dangerouslySetInnerHTML={{__html: result}}></div>)
}