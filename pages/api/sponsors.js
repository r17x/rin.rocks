export const config = {
  runtime: "experimental-edge",
};

const ghGQLURL = process.env.GH_GRAPHQL_URL || "";
const ghToken = process.env.GH_TOKEN || "";
const authorization = `bearer ${ghToken}`;

const ok = (data) => ({ data, error: null });
const error = (error_) => ({ data: null, error: error_ });

const responseOk = (data) =>
  new Response(JSON.stringify(ok(data)), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

const responseError = (e) =>
  new Response(JSON.stringify(error(e.message || "something wrong :'(")), {
    status: 500,
    headers: {
      "content-type": "application/json",
    },
  });

const sponsorsQuery = ({ login, first }) =>
  `query { 
      user(login: "${login}"){
        sponsors(first: ${first || 100}) {
          totalCount 
          nodes {
            ... on User {
              name
              avatarUrl
              login
              websiteUrl
              twitterUsername
              hasSponsorsListing
            }
          }
      }
  }
}
    `;

const getSponsors = (opts) => fetch(ghGQLURL, opts).then((r) => r.json());

const filterByHasSponsorListing = (sponsor) => sponsor.hasSponsorsListing;
const removeSponsorsField = ({ hasSponsorsListing: _, ...fields }) => fields;
const mapSponsorsData = ({ data }) => ({
  ...data,
  user: {
    ...data.user,
    sponsorsCount: data.user.sponsors.totalCount,
    sponsors: data.user.sponsors.nodes.filter(filterByHasSponsorListing).map(removeSponsorsField),
  },
});

export default function Sponsors(req) {
  return Promise.resolve(new URL(req.url))
    .then(({ searchParams }) => searchParams.get("username") || "")
    .then((username) =>
      ({
        [true]: () => username,
        [username.length === 0]: () => {
          throw new Error("username params is required!");
        },
      }.true()),
    )
    .then((login) =>
      getSponsors({
        method: "POST",
        headers: { authorization },
        body: JSON.stringify({
          query: sponsorsQuery({ login }),
          variables: {},
        }),
      }),
    )
    .then(mapSponsorsData)
    .then(responseOk)
    .catch(responseError);
}
