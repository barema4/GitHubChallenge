import { rest } from 'msw'

export const handlers = [
  rest.get('https://api.github.com/users/barema4', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.json({
        "login": "barema4",
        "id": 32159274,
        "node_id": "MDQ6VXNlcjMyMTU5Mjc0",
        "avatar_url": "https://avatars.githubusercontent.com/u/32159274?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/barema4",
        "html_url": "https://github.com/barema4",
        "followers_url": "https://api.github.com/users/barema4/followers",
        "following_url": "https://api.github.com/users/barema4/following{/other_user}",
        "gists_url": "https://api.github.com/users/barema4/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/barema4/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/barema4/subscriptions",
        "organizations_url": "https://api.github.com/users/barema4/orgs",
        "repos_url": "https://api.github.com/users/barema4/repos",
        "events_url": "https://api.github.com/users/barema4/events{/privacy}",
        "received_events_url": "https://api.github.com/users/barema4/received_events",
        "type": "User",
        "site_admin": false,
        "name": "sam rubarema",
        "company": "Andela",
        "blog": "https://barema4.github.io/portfolio/",
        "location": "kampala Uganda",
        "email": null,
        "hireable": null,
        "bio": "A software engineer who loves solving problems and learning. I am proficient in Vue.js, React.js and Python",
        "twitter_username": null,
        "public_repos": 64,
        "public_gists": 1,
        "followers": 1,
        "following": 0,
        "created_at": "2017-09-21T08:16:25Z",
        "updated_at": "2022-06-22T13:30:19Z"
      }
      )
    )
  }),
]