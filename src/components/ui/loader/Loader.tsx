import { Loader as LoaderIcon } from 'lucide-react';

import styles from './loader.module.scss';

const Loader = () => (
	<div className={styles.wrapper}>
		<LoaderIcon className={styles.loader} />
	</div>
);

export default Loader;
