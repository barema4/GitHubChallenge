import { useContext, useEffect, useState, useRef } from "react";
import fetch from 'cross-fetch';
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TopAreaProps, UserProps } from "../../types";
import { joinedDate } from "../../utils/formatter";

export const TopArea = ({ setUser }: TopAreaProps) => {
  const { changeTheme, lightMode } = useContext(ThemeContext);
  const [empty, setEmpty] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [inputUser] = useState("octocat");
  const [loading, setLoading] = useState(false)

  function hadleSubmit() {
    if (
      usernameRef.current?.value.trim() === "" ||
      usernameRef.current?.value === undefined
    ) {
      setEmpty(true);
      setUser(null);
      return;
    }

    setEmpty(false);
    fetchUser(usernameRef.current.value);
  }

  async function fetchUser(username: string) {
    setLoading(true)
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status != 200) {
      setNotFound(true);
      setUser(null);
      return;
    }

    setNotFound(false);

    const user: UserProps = {
      pfp: data.avatar_url,
      name: data.name,
      joinedAt: joinedDate(data.created_at),
      username: data.login,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      links: {
        location: data.location,
        twitter: data.twitter_username,
        company: data.company,
        blog: data.blog,
      },
    };
    setUser(user);
    setLoading(false)
  }

  useEffect(() => {
    fetchUser(inputUser)
  }, [inputUser])

  return (
    <Container>
      <ThemeArea>
        <svg
          width="124"
          height="21"
          viewBox="0 0 126 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.284 18.128H9.816C9.67733 18.4227 9.504 18.7087 9.296 18.986C9.10533 19.246 8.84533 19.48 8.516 19.688C8.204 19.896 7.82267 20.0607 7.372 20.182C6.93867 20.3033 6.41 20.364 5.786 20.364C4.98867 20.364 4.24333 20.2253 3.55 19.948C2.874 19.6533 2.276 19.2287 1.756 18.674C1.25333 18.102 0.854667 17.4087 0.56 16.594C0.282667 15.7793 0.144 14.8433 0.144 13.786V13.318C0.144 12.278 0.291333 11.3507 0.586 10.536C0.898 9.72133 1.314 9.03667 1.834 8.482C2.37133 7.91 2.98667 7.47667 3.68 7.182C4.39067 6.88733 5.136 6.74 5.916 6.74C6.956 6.74 7.77933 6.93933 8.386 7.338C8.99267 7.71933 9.46933 8.26533 9.816 8.976H10.284V1.8H13.56V20H10.284V18.128ZM6.852 17.244C7.87467 17.244 8.698 16.9233 9.322 16.282C9.96333 15.6233 10.284 14.7653 10.284 13.708V13.396C10.284 12.3387 9.96333 11.4893 9.322 10.848C8.698 10.1893 7.87467 9.86 6.852 9.86C5.82933 9.86 4.99733 10.1807 4.356 10.822C3.732 11.446 3.42 12.304 3.42 13.396V13.708C3.42 14.8 3.732 15.6667 4.356 16.308C4.99733 16.932 5.82933 17.244 6.852 17.244ZM19.8339 14.618C19.8513 14.9993 19.9379 15.3547 20.0939 15.684C20.2673 15.996 20.4926 16.2733 20.7699 16.516C21.0646 16.7413 21.3939 16.9233 21.7579 17.062C22.1393 17.1833 22.5379 17.244 22.9539 17.244C23.7686 17.244 24.3926 17.1053 24.8259 16.828C25.2593 16.5333 25.5713 16.1867 25.7619 15.788L28.5699 17.348C28.4139 17.6773 28.1973 18.024 27.9199 18.388C27.6426 18.7347 27.2786 19.0553 26.8279 19.35C26.3946 19.6447 25.8573 19.8873 25.2159 20.078C24.5919 20.2687 23.8553 20.364 23.0059 20.364C22.0353 20.364 21.1513 20.208 20.3539 19.896C19.5566 19.584 18.8633 19.1333 18.2739 18.544C17.7019 17.9547 17.2513 17.2353 16.9219 16.386C16.6099 15.5367 16.4539 14.5747 16.4539 13.5V13.344C16.4539 12.356 16.6186 11.4547 16.9479 10.64C17.2946 9.82533 17.7626 9.132 18.3519 8.56C18.9413 7.988 19.6259 7.546 20.4059 7.234C21.2033 6.90467 22.0526 6.74 22.9539 6.74C24.0633 6.74 25.0166 6.93933 25.8139 7.338C26.6113 7.71933 27.2699 8.21333 27.7899 8.82C28.3099 9.40933 28.6913 10.068 28.9339 10.796C29.1766 11.5067 29.2979 12.2 29.2979 12.876V14.618H19.8339ZM22.9279 9.704C22.0959 9.704 21.4199 9.92067 20.8999 10.354C20.3799 10.77 20.0419 11.2553 19.8859 11.81H25.9699C25.8659 11.2033 25.5366 10.7007 24.9819 10.302C24.4446 9.90333 23.7599 9.704 22.9279 9.704ZM31.9578 7.104H35.4938L38.5358 18.44H39.0038L42.0458 7.104H45.5818L41.8898 20H35.6498L31.9578 7.104ZM56.7438 3.256C56.7438 2.92667 56.8044 2.61467 56.9258 2.32C57.0644 2.008 57.2464 1.748 57.4718 1.54C57.6971 1.31467 57.9571 1.14133 58.2518 1.02C58.5464 0.881333 58.8671 0.811999 59.2138 0.811999C59.8898 0.811999 60.4618 1.05467 60.9298 1.54C61.4151 2.008 61.6578 2.58 61.6578 3.256C61.6578 3.60267 61.5884 3.92333 61.4498 4.218C61.3284 4.51267 61.1551 4.77267 60.9298 4.998C60.7218 5.22333 60.4618 5.40533 60.1498 5.544C59.8551 5.66533 59.5431 5.726 59.2138 5.726C58.8671 5.726 58.5464 5.66533 58.2518 5.544C57.9571 5.40533 57.6971 5.22333 57.4718 4.998C57.2464 4.77267 57.0644 4.51267 56.9258 4.218C56.8044 3.92333 56.7438 3.60267 56.7438 3.256ZM47.3838 7.104H50.4258V4.452C50.4258 3.70667 50.6771 3.08267 51.1798 2.58C51.6824 2.06 52.3064 1.8 53.0518 1.8H55.4958V4.92H54.4038C53.9358 4.92 53.7018 5.18 53.7018 5.7V7.104H60.8518V20H57.5758V10.224H53.7018V20H50.4258V10.224H47.3838V7.104ZM67.9837 20H64.7077V7.104H67.9837V9.028H68.4517C68.7464 8.3 69.223 7.73667 69.8817 7.338C70.5404 6.93933 71.3117 6.74 72.1957 6.74C72.8197 6.74 73.4004 6.844 73.9377 7.052C74.4924 7.24267 74.9777 7.546 75.3937 7.962C75.8097 8.378 76.1304 8.90667 76.3557 9.548C76.5984 10.1893 76.7197 10.952 76.7197 11.836V20H73.4437V12.668C73.4437 11.7493 73.2184 11.03 72.7677 10.51C72.3344 9.97267 71.7017 9.704 70.8697 9.704C69.899 9.704 69.171 10.0333 68.6857 10.692C68.2177 11.3333 67.9837 12.2 67.9837 13.292V20ZM89.8836 18.128H89.4156C89.2769 18.4227 89.1036 18.7087 88.8956 18.986C88.7049 19.246 88.4449 19.48 88.1156 19.688C87.8036 19.896 87.4223 20.0607 86.9716 20.182C86.5383 20.3033 86.0096 20.364 85.3856 20.364C84.5883 20.364 83.8429 20.2253 83.1496 19.948C82.4736 19.6533 81.8756 19.2287 81.3556 18.674C80.8529 18.102 80.4543 17.4087 80.1596 16.594C79.8823 15.7793 79.7436 14.8433 79.7436 13.786V13.318C79.7436 12.278 79.8909 11.3507 80.1856 10.536C80.4976 9.72133 80.9136 9.03667 81.4336 8.482C81.9709 7.91 82.5863 7.47667 83.2796 7.182C83.9903 6.88733 84.7356 6.74 85.5156 6.74C86.5556 6.74 87.3789 6.93933 87.9856 7.338C88.5923 7.71933 89.0689 8.26533 89.4156 8.976H89.8836V1.8H93.1596V20H89.8836V18.128ZM86.4516 17.244C87.4743 17.244 88.2976 16.9233 88.9216 16.282C89.5629 15.6233 89.8836 14.7653 89.8836 13.708V13.396C89.8836 12.3387 89.5629 11.4893 88.9216 10.848C88.2976 10.1893 87.4743 9.86 86.4516 9.86C85.4289 9.86 84.5969 10.1807 83.9556 10.822C83.3316 11.446 83.0196 12.304 83.0196 13.396V13.708C83.0196 14.8 83.3316 15.6667 83.9556 16.308C84.5969 16.932 85.4289 17.244 86.4516 17.244ZM99.4335 14.618C99.4509 14.9993 99.5375 15.3547 99.6935 15.684C99.8669 15.996 100.092 16.2733 100.37 16.516C100.664 16.7413 100.994 16.9233 101.358 17.062C101.739 17.1833 102.138 17.244 102.554 17.244C103.368 17.244 103.992 17.1053 104.426 16.828C104.859 16.5333 105.171 16.1867 105.362 15.788L108.17 17.348C108.014 17.6773 107.797 18.024 107.52 18.388C107.242 18.7347 106.878 19.0553 106.428 19.35C105.994 19.6447 105.457 19.8873 104.816 20.078C104.192 20.2687 103.455 20.364 102.606 20.364C101.635 20.364 100.751 20.208 99.9535 19.896C99.1562 19.584 98.4629 19.1333 97.8735 18.544C97.3015 17.9547 96.8509 17.2353 96.5215 16.386C96.2095 15.5367 96.0535 14.5747 96.0535 13.5V13.344C96.0535 12.356 96.2182 11.4547 96.5475 10.64C96.8942 9.82533 97.3622 9.132 97.9515 8.56C98.5409 7.988 99.2255 7.546 100.006 7.234C100.803 6.90467 101.652 6.74 102.554 6.74C103.663 6.74 104.616 6.93933 105.414 7.338C106.211 7.71933 106.87 8.21333 107.39 8.82C107.91 9.40933 108.291 10.068 108.534 10.796C108.776 11.5067 108.898 12.2 108.898 12.876V14.618H99.4335ZM102.528 9.704C101.696 9.704 101.02 9.92067 100.5 10.354C99.9795 10.77 99.6415 11.2553 99.4855 11.81H105.57C105.466 11.2033 105.136 10.7007 104.582 10.302C104.044 9.90333 103.36 9.704 102.528 9.704ZM111.843 7.104H117.303V8.976H117.771C118.014 8.26533 118.421 7.71933 118.993 7.338C119.583 6.93933 120.285 6.74 121.099 6.74C122.382 6.74 123.413 7.14733 124.193 7.962C124.973 8.75933 125.363 9.98133 125.363 11.628V12.2L121.983 12.512V12.148C121.983 11.4373 121.801 10.874 121.437 10.458C121.073 10.0247 120.527 9.808 119.799 9.808C119.071 9.808 118.499 10.0593 118.083 10.562C117.667 11.0647 117.459 11.784 117.459 12.72V16.88H120.423V20H111.531V16.88H114.183V10.224H111.843V7.104Z"
            fill={lightMode ? "#222731" : "#fff"}
          />
        </svg>
        <ChangeThemeBtn type="button" onClick={changeTheme}>
          {lightMode ? (
            <>
              DARK
              <img src="/assets/icon-moon.svg" alt="dark mode" />
            </>
          ) : (
            <>
              LIGHT
              <img src="/assets/icon-sun.svg" alt="light mode" />
            </>
          )}
        </ChangeThemeBtn>
      </ThemeArea>

      <InputArea
        onSubmit={(e) => {
          e.preventDefault();
          hadleSubmit();
        }}
      >
        <InputLabel>
          <img src="/assets/icon-search.svg" alt="search .." />
        </InputLabel>

        <Input
          ref={usernameRef}
          data-testid="username"
          name="username"
          id="username"
          type="text"
          placeholder="Search GitHub username ..."
        />
        {empty && <Warn>Enter User</Warn>}
        {notFound && <Warn>Not Found</Warn>}

        <SubmitBtn type="submit" data-testid="search-username">{loading ? 'Fetching User' : 'Search'}</SubmitBtn>
      </InputArea>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  max-width: 73.3rem;
`;

const ThemeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const Warn = styled.small`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: #f74646;
    margin-right: 2.4rem;
`

const ChangeThemeBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: 0.25rem;
  color: ${(props) => props.theme.colors.themeBtn};
  cursor: pointer;

  img {
    margin-left: 1.6rem;
  }
`;

const InputArea = styled.form`
  margin-top: 3.6rem;
  border-radius: 1.5rem;
  background: ${(props) => props.theme.colors.card};
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;

  @media (min-width: 768px) {
    height: 6.9rem;
  }
`;

const InputLabel = styled.label`
  height: 2.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 192%;
  color: ${(props) => props.theme.colors.textNorm};
  background: none;
  border: none;
  margin: 0 0.8rem;

  @media (min-width: 768px) {
    font-size: 1.7rem;
    margin: 0 2.4rem;
  }

  &:focus {
    outline: 1px dashed #0079ff;
  }
`;

const SubmitBtn = styled.button`
  background: #0079ff;
  border: none;
  height: 100%;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;
  transition: all 0.3s ease-out;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 15px -3px #0079ff;
  }

  @media (min-width: 768px) {
    width: 10.6rem;
    font-size: 1.7rem;
  }
`;