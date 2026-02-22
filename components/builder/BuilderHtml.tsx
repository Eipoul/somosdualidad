type BuilderHtmlProps = {
  html: string
}

export function BuilderHtml({html}: BuilderHtmlProps) {
  return <div className="builder-page" dangerouslySetInnerHTML={{__html: html}} />
}
