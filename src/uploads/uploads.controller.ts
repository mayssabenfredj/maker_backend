// uploads.controller.ts
import {
  Controller,
  Get,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { existsSync, statSync, createReadStream } from 'fs';
import { resolve, normalize } from 'path';

@Controller('uploads')
export class UploadsController {
  /**
   * Obtient le chemin de la racine du projet
   */
  private getProjectRoot(): string {
    const currentDir = __dirname;
    if (currentDir.includes('dist')) {
      return resolve(currentDir, '..');
    }
    return resolve(currentDir, '../..');
  }

  /**
   * Obtient le chemin du dossier uploads
   */
  private getUploadsPath(): string {
    const projectRoot = this.getProjectRoot();
    return resolve(projectRoot, 'uploads');
  }

  @Get('*')
  async serveFile(@Req() req: Request, @Res() res: Response) {
    // Extraire le chemin du fichier depuis req.path
    // req.path sera /uploads/filename.png ou /api/uploads/filename.png
    let filePath = req.path;

    // Retirer le préfixe /uploads/ ou /api/uploads/
    filePath = filePath.replace(/^\/api\/uploads\//, '').replace(/^\/uploads\//, '');

    // Vérifier que le chemin n'est pas vide
    if (!filePath || filePath === 'uploads' || filePath === 'api/uploads' || filePath === '/') {
      throw new NotFoundException('File path is required');
    }

    // Construire le chemin complet du fichier
    const uploadsPath = this.getUploadsPath();
    const normalizedPath = normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const fullFilePath = resolve(uploadsPath, normalizedPath);

    // Sécuriser : empêcher l'accès aux fichiers en dehors du dossier uploads
    if (!fullFilePath.startsWith(uploadsPath)) {
      throw new NotFoundException('Invalid file path');
    }

    // Vérifier que le fichier existe
    if (!existsSync(fullFilePath)) {
      throw new NotFoundException(`File not found: ${filePath}`);
    }

    // Obtenir les stats du fichier
    const stats = statSync(fullFilePath);
    const fileSize = stats.size;

    // Déterminer le Content-Type selon l'extension
    const ext = filePath.split('.').pop()?.toLowerCase();
    const contentTypeMap: { [key: string]: string } = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      pdf: 'application/pdf',
      mp4: 'video/mp4',
      mp3: 'audio/mpeg',
      json: 'application/json',
    };

    const contentType = contentTypeMap[ext || ''] || 'application/octet-stream';

    // Définir les headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', fileSize.toString());
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Envoyer le fichier
    const fileStream = createReadStream(fullFilePath);
    fileStream.on('error', (error) => {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error reading file' });
      }
    });
    fileStream.pipe(res);
  }
}

