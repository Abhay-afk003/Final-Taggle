require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const puppeteer = require('puppeteer');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/scrape', async (req, res) => {
  const { platforms, dataToExtract, leadScoringVariables } = req.body;

  if (!platforms || !dataToExtract) {
    return res.status(400).json({ error: 'Platforms and dataToExtract are required' });
  }

  try {
    for (const platform of platforms) {
      switch (platform) {
        case 'reddit':
          await scrapeReddit(dataToExtract, leadScoringVariables);
          break;
        default:
          io.emit('notification', { message: `Platform ${platform} not supported yet` });
      }
    }
    res.status(200).json({ message: 'Scraping completed successfully' });
  } catch (error) {
    console.error('Scraping failed:', error);
    res.status(500).json({ error: 'Scraping failed', message: error.message });
  }
});

async function scrapeReddit(dataToExtract, leadScoringVariables) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    for (const subreddit of ['javascript', 'reactjs']) {
      await page.goto(`https://www.reddit.com/r/${subreddit}/`, { waitUntil: 'networkidle2' });

      const posts = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('div[data-testid="post-container"]').forEach((post) => {
          const title = post.querySelector('h3')?.innerText;
          const author = post.querySelector('div[data-testid="post-author-name"]')?.innerText;
          const upvotes = post.querySelector('div[id^="vote-arrows-"]')?.innerText.split('\n')[0];

          if (title && author) {
            items.push({ title, author, upvotes });
          }
        });
        return items;
      });

      posts.forEach(post => {
        const score = calculateLeadScore(post, leadScoringVariables);
        if (score > 50) {
          io.emit('new_lead', { ...post, score, platform: 'reddit' });
        }
      });
    }
  } catch (error) {
    console.error('Error scraping Reddit:', error);
    io.emit('notification', { message: 'Error scraping Reddit' });
  } finally {
    await browser.close();
  }
}

function calculateLeadScore(post, leadScoringVariables) {
  let score = 0;
  const { painIndicators, activity, engagement } = leadScoringVariables;

  if (painIndicators) {
    const painRegex = new RegExp(painIndicators.join('|'), 'i');
    if (painRegex.test(post.title)) {
      score += 50;
    }
  }

  if (activity) {
    score += 20;
  }

  if (engagement && post.upvotes) {
    const upvoteCount = parseInt(post.upvotes.replace('k', '000'));
    if (upvoteCount > 100) {
      score += 30;
    }
  }

  return Math.min(score, 100);
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
