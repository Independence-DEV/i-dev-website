import { Grid, Container } from '@mantine/core';
import { HeaderMiddle } from '../components/HeaderMiddle/HeaderMiddle';
import { ArticleCardImage } from '../components/ArticleCardImage/ArticleCardImage';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { BadgeCard } from '../components/BadgeCard/BadgeCard';
import { FooterLinks } from '../components/FooterLinks/FooterLinks';
import { useEffect } from "react";
import React from 'react';

export default function HomePage() {

  const [articles, setArticles] = React.useState([]);

  const headerMiddleProps = {
    "links": [
      { "link": "/", "label": "Home" }
    ]
  }
  const footerLinksProps = {
    "data": [
      {
        "title": "About",
        "links": [
          { "label": "Features", "link": "#" },
          { "label": "Pricing", "link": "#" },
          { "label": "Support", "link": "#" },
          { "label": "Forums", "link": "#" }
        ]
      },
      {
        "title": "Project",
        "links": [
          { "label": "Contribute", "link": "#" },
          { "label": "Media assets", "link": "#" },
          { "label": "Changelog", "link": "#" },
          { "label": "Releases", "link": "#" }
        ]
      },
      {
        "title": "Community",
        "links": [
          { "label": "Join Discord", "link": "#" },
          { "label": "Follow on Twitter", "link": "#" },
          { "label": "Email newsletter", "link": "#" },
          { "label": "GitHub discussions", "link": "#" }
        ]
      }
    ]
  }

  useEffect(() => {
    callAPI();
  }, [])

  const callAPI = async () => {
  
		try {
      const badgeCardProps = [];
			const res = await fetch(
				`https://dev.to/api/articles?username=devindependence`
			);
			const data = await res.json();
      data.forEach(function (value) {
        badgeCardProps.push(
          {
            "id" : value["id"],
            "image": value["cover_image"],
            "title": value["title"],
            "country": value["tags"],
            "description": value["description"],
            "url": value["url"],
          }
        )
      })
      setArticles(badgeCardProps);
		} catch (err) {
			console.log(err);
		}
	};

  const items = articles.map((article) => (
    <Grid.Col span={4} key={article.id}><BadgeCard {...article} /></Grid.Col>
  ));

  return (
    <>
      <HeaderMiddle {...headerMiddleProps} />
        <Container size="md" px="md">
          <Grid>
            {items}
            </Grid>
      </Container>
    < FooterLinks {...footerLinksProps} />
    </>
  );
}
