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
    const headerHeight = 58
    const imageHeight = 225
    const el = event.target
    const article = el.closest('article')
    const bodyRect = document.body.getBoundingClientRect()
    const articleRect = article.getBoundingClientRect()
    const url = article.getAttribute('data-url') || el.getAttribute('data-url')
    const top = Math.abs(bodyRect.top) + articleRect.top - headerHeight - imageHeight
    this.setState({
      top: Math.max(top, 0),
      article: this.props.news.find(article => article.url === url)
    })
  }

  goToStory = event => {
    const el = event.target
    const url = el.closest('article').getAttribute('data-url') || el.getAttribute('data-url')
    window.open(url, '_blank')
  }

  render() {
    return (
      <main>
        <h1>Crypto News</h1>
        <Grid columns={2} divided className="grid">
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
                    <div>
                      <span>{article.title}</span>
                      <span className="age">{age} &bull; {this.getDomain(article.url)}</span>
                    </div>
                    <div className="mobile-description">
                      <div
                        style={{
                          display: article.url === this.state.article.url ? 'block' : 'none'
                        }}
                      >
                        <p>
                          {article.description}
                        </p>
                        <p>
                          <Button
                            size="medium"
                            data-url={this.state.article.url}
                            color="black"
                            onClick={this.goToStory}
                          >Full article</Button>
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </Grid.Column>
            <Grid.Column id="right-pane">
              <div
                style={{
                  top: this.state.top
                }}
              >
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
                  >Read full article</Button>
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
