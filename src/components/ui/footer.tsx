import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="hidden sm:block py-10 bg-gray-100">
      <p className="text-sm mx-auto w-4/5 text-center">
        Desarrollador Web: Francis Willener
      </p>
      <div className="flex justify-center items-center gap-3 mt-3">
        <a
          href="mailto:willenerfrancis0@gmail.com"
          className="bg-gray-300 text-gray-800 py-1 px-1.5 rounded-full text-moredark hover:text-red-400 hover:bg-transparent transition-all"
        >
          <MailIcon className="w-5" />
        </a>
        <a
          href="https://github.com/chesquinio"
          target="_BLANCK"
          className="bg-gray-300 text-gray-800 py-1 px-1.5 rounded-full text-moredark hover:text-gray-950 hover:bg-transparent transition-all"
        >
          <GithubIcon className="w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/francis-willener/"
          target="_BLANCK"
          className="bg-gray-300 text-gray-800 py-1 px-1.5 rounded-full text-moredark hover:text-blue-400 hover:bg-transparent transition-all"
        >
          <LinkedinIcon className="w-5" />
        </a>
      </div>
    </div>
  );
}
