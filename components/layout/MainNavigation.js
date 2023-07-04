import classes from './MainNavigation.module.css';
import Link from 'next/link';
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Todo App</div>
      <nav>
        <ul>
          <li>
            <Link href='/today'>Today Task</Link>
          </li>
          <li>
            <Link href='/today/completedtask'>Completed Task</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
