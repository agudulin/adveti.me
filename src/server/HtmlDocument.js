import React, { PropTypes } from "react";
import { provideContext } from "fluxible/addons";

class HtmlDocument extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    script: [],
    css: []
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { state, markup, script, css, lang } = this.props;
    const htmlHead = this.context.getStore("HtmlHeadStore");

    return (
      <html lang={lang}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

          <title>{ htmlHead.getTitle() }</title>

          <meta name="description" content={ htmlHead.getDescription() } />

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />

          { script.map((src, k) => <script key={k} src={src} />) }

        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
