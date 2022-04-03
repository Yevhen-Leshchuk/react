import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import slugify from 'slugify';
import * as bookShelfAPI from '../services/bookshelf-api';
import PageHeading from '../components/PageHeading/PageHeading';
// import AuthorSubView from './AuthorSubView';

const AuthorSubView = lazy(() =>
  import('./AuthorSubView.js' /* webpackChunkName: "authors-subview"*/),
);

const makeSlug = string => slugify(string, { lower: true });

export default function AuthorsView() {
  const { url, path } = useRouteMatch();
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    bookShelfAPI.fetchAuthors().then(setAuthors);
  }, []);

  return (
    <>
      <PageHeading text="Авторы" />

      {authors && (
        <ul>
          {authors.map(author => (
            <li key={author.id}>
              <NavLink
                to={{
                  pathname: `${url}/${makeSlug(`${author.name} ${author.id}`)}`,
                }}
              >
                {author.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <hr />

      <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
        <Route path={`${path}/:slug`}>
          {authors && <AuthorSubView authors={authors} />}
        </Route>
      </Suspense>
    </>
  );
}
