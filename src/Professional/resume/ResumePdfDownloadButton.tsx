import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import {
    Button,
    CircularProgress,
} from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { ResumePdfDocument } from '../resume/ResumePdfDocuments';

export function ResumePdfDownloadButton() {
    const [generating, setGenerating] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function downloadResume() {
        setGenerating(true);
        setError(null);

        try {
            const blob = await pdf(
                <ResumePdfDocument />,
            ).toBlob();

            const url =
                URL.createObjectURL(blob);

            const downloadLink =
                document.createElement('a');

            downloadLink.href = url;
            downloadLink.download =
                'Christopher-Warner-Resume.pdf';

            document.body.appendChild(
                downloadLink,
            );

            downloadLink.click();
            downloadLink.remove();

            URL.revokeObjectURL(url);
        } catch (downloadError) {
            console.error(
                'Unable to generate résumé PDF:',
                downloadError,
            );

            setError(
                'The résumé PDF could not be generated.',
            );
        } finally {
            setGenerating(false);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                disabled={generating}
                startIcon={
                    generating ? (
                        <CircularProgress
                            size={18}
                            color="inherit"
                        />
                    ) : (
                        <DownloadOutlinedIcon />
                    )
                }
                onClick={() =>
                    void downloadResume()
                }
            >
                {generating
                    ? 'Generating PDF...'
                    : 'Download résumé'}
            </Button>

            {error && (
                <span role="alert">
                    {error}
                </span>
            )}
        </>
    );
}