# 修改 Github Contributions 邮箱

## 事情起因

众所周知哈, GitHub 的 Contributions 的绿点点图是根据你当时提交代码的时候的邮箱来生成的  
具体的规则可以参考以下官方链接 [About your contribution graph](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile#about-your-contribution-graph)  
简单来说, 贡献图是根据你 GitHub 的绑定的邮箱强相关的, 只有你的提交 commit 的邮箱包含在你 GitHub 的绑定的邮箱列表中, 才能被统计到你的贡献图中  
但是问题就来了, 如果之前用邮箱 A 提交的记录并且当时邮箱 A 也绑定了 GitHub 的账户, 但是后来邮箱 A 因为某种原因被弃用了, 那么之前的提交记录就不会统计到, 导致你的贡献图中没有对应的绿点点了  
对于一个程序员而言, 绿点点可以一个很重要的欣慰品, 可以说是一个自己的某种见证, 但是这种贡献图对于经常更换邮箱的人来说就特别不友好了

## 问题思考

然后我就网上搜索, 看有没有什么方案可以解决这种问题  
终于高强度冲浪的时候,让我看到了一个方案  
原理就是通过 `git filter-branch` 命令来修改历史提交的邮箱,这个甚至可以修改提交的地址  
考虑到我这边 GitHub 的历史比较复杂, 大学的时候就来来回回换过好几个邮箱了,再加上本身我的仓库也是比较多的  
所以我就写了一个简单的 python 脚本,用于批量把本人 GitHub 账户下所有的仓库的所有提交记录的邮箱都修改成我现在使用的邮箱  
以下是具体的代码, 具体也可参考这个脚本[change_email.py](https://github.com/LittleControl/MacTips/blob/main/scripts/gits/change-email.py)

## 具体方案

> [!WARNING]
> 因为可能存在风险，本人针对以下脚本所产生的影响概不负责 :yum:

```python
#!/usr/bin/python
import requests
import os

def get_user_repos(username, token):
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"Authorization": f"token {token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        repos_json = response.json()
        repos_res = [
            {"repo_url": repo["html_url"], "repo_name": repo["name"]}
            for repo in repos_json
        ]
        return repos_res
    else:
        print("Error:", response.status_code)
        return None


def change_git_email(username, email, repo_url, repo_name):
    git_filter_sh = f"""
      git filter-branch -f --env-filter '
      if [ "$GIT_COMMITTER_EMAIL" != "{email}" ]; then
          GIT_AUTHOR_NAME="{username}"
          GIT_AUTHOR_EMAIL="{email}"
          GIT_COMMITTER_NAME="{username}"
          GIT_COMMITTER_EMAIL="{email}"
      fi
      if [ "$GIT_COMMITTER_EMAIL" != "{email}" ]; then
          GIT_AUTHOR_NAME="{username}"
          GIT_AUTHOR_EMAIL="{email}"
          GIT_COMMITTER_NAME="{username}"
          GIT_COMMITTER_EMAIL="{email}"
      fi
      ' --tag-name-filter cat -- --branches --tags && git push origin --force --all
    """
    os.system(f"git clone {repo_url} && cd {repo_name} && {git_filter_sh}")
    os.system(f"rm -rf {repo_name}")


if __name__ == "__main__":
    #  这里的email就是你要修改成的邮箱
    email = "i@littlecontrol.cc"
    #  这里的username 可以换成任意名称,这个无所谓, 重点是邮箱要正确
    username = "LittleControl"
    # 这里需要是你自己的token, 这个可以在GitHub的个人设置中生成, 因为要遍历访问所有的仓库, 所以需要有足够的权限
    token = "github_pat_11AJ"
    repos = get_user_repos(username, token)
    if repos:
        for repo in repos:
            change_git_email(username, email, repo["repo_url"], repo["repo_name"])
```

> [!IMPORTANT]
> 请注意哈,这个脚步默认是在当前目录遍历克隆你的所有的仓库, 然后修改邮箱, 所以你需要保证当前目录是一个空目录, 否则可能会出现一些奇奇乖乖的问题
