import React from 'react'
import './App.css'
import URL from 'url'
import { Grid, Button } from 'semantic-ui-react'
import formatDistance from 'date-fns/formatDistance'
import format from 'date-fns/format'

const HotWallet = window.HotWallet

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      article: this.props.news[0]
    }

    HotWallet.rpc('getBalances').then(function (balances) {
      console.log('balances:', balances)
    })

    try {
      console.log('parent document:', window.parent.document)
      console.log('Oh no! Iframe has access to parent window.')
    } catch (err) {
      console.log('Iframe is sandboxed.')
    }

  }

  getDomain(url) {
    return URL.parse(url).host.replace('www.', '')
  }

  onClickArticle = event => {
    const el = event.target
    const url = el.parentNode.getAttribute('data-url') || el.getAttribute('data-url')
    this.setState({
      article: this.props.news.find(article => article.url === url)
    })
  }

  goToStory = event => {
    const el = event.target
    const url = el.parentNode.getAttribute('data-url') || el.getAttribute('data-url')
    window.open(url, '_blank')
  }

  render() {
    return (
      <main>
        <h1>Crypto News</h1>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column id="left-pane">
              {this.props.news.map(article => {
                const age = formatDistance(article.publishedAt, new Date(), { addSuffix: true })
                return (
                  <article
                    key={article.url}
                    data-url={article.url}
                    onClick={this.onClickArticle}
                  >
                    <span>{article.title}</span>
                    <span className="age">{age} &bull; {this.getDomain(article.url)}</span>
                  </article>
                )
              })}
            </Grid.Column>
            <Grid.Column id="right-pane">
              <div>
                {this.state.article.image ?
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url("${this.state.article.image}")`
                    }}
                  /> : ''}
                <h2>{this.state.article.title}</h2>
                <p>{format(this.state.article.publishedAt, 'eeee, MMMM do yyyy')}</p>
                <p className="description">{this.state.article.description}</p>
                <p>
                  {this.getDomain(this.state.article.url)}
                </p>
                <p>
                  <Button
                    size="huge"
                    data-url={this.state.article.url}
                    color="black"
                    onClick={this.goToStory}
                  >Read more</Button>
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </main>
    )
  }
}

export default App
